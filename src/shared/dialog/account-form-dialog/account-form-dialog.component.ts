import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormControlStatus, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  AccountControls,
  AllRegistrationSessionData, ChatListItems,
  paymentMethodFormMapper,
  REGISTRATION_DATA,
} from '@shared/entities';
import {DestroyService} from '@shared/services';
import {ButtonComponent, InputFieldComponent} from '@shared/ui';
import {SessionStorageService} from '@shared/web-api';
import {map, Observable, of, switchMap, takeUntil, tap} from 'rxjs';
import {BankService, RegisterService} from '@shared/api/services';
import {BankBranches, BanksGetResponse, ChatResponse, IdAndNameResponse} from '@shared/api/models';
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiDialogService} from "@taiga-ui/core";
import {TUI_DIALOGS} from "@taiga-ui/cdk";

@Component({
  selector: 'smarti-account-form-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './account-form-dialog.component.html',
  styleUrls: ['./account-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDialogService, { provide: TUI_DIALOGS, useExisting: TuiDialogService }],
})
export class AccountFormDialogComponent implements OnInit {
  @Input() public observer!: { complete: () => void };
  public accountForm: FormGroup<AccountControls> = paymentMethodFormMapper();
  public isDisabled: boolean = true;
  public banks!: [];
  public bank_branches!: IdAndNameResponse[];
  public banksWithBranch!: BanksGetResponse[];
  public accountFormChange$: Observable<FormControlStatus> = this.accountForm
    .statusChanges.pipe(takeUntil(this.destroy$));
  private readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly configContext: any,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly bankService: BankService,
    private readonly registerService: RegisterService,
  ) {
  }

  public ngOnInit(): void {
    this.loadBanks();

    this.accountForm.setValue({
      accountNumber: this.currentStorageData?.accountNumber ?? '',
      branchNumber: this.currentStorageData?.branchNumber ?? '',
      bankName: this.currentStorageData?.bankName ?? '',
    });
    this.isDisabled = !this.accountForm.valid;
    this.accountForm.updateValueAndValidity({emitEvent: true});
    this.accountFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
    // this.accountForm.get('bankName')?.valueChanges.pipe(
    //   switchMap((value: IdAndNameResponse | null) => {
    //    return of(this.bankBranch =  this.banksWithBranch.find(item => item.id == value?.id).bank_branches);
    //   }),
    //   takeUntil(this.destroy$),
    // ).subscribe();
    this.accountForm.get('bankName')?.valueChanges.pipe(
      switchMap((value) => {
        if (value) {
          const banksc = this.banksWithBranch.find(item => item.name === value)?.bank_branches;
          if (banksc) {
            console.log(banksc)
            this.bank_branches = banksc.map((item): IdAndNameResponse => ({
              ...item,
              id: Number(item.id) as number,
              name: item.name as string
            }));
          }
        }
        // tap((response: IdAndNameResponse[]) => this.bank_branches = this.banksWithBranch.find(item => item.name==value).bank_branches as IdAndNameResponse[]);
        return of();
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public loadBanks(): void {
    this.bankService.apiGeneralsBanksGet({withBranches: true}).pipe(
      // map(res => {res.forEach(bank => {this.banks?.push(bank.name as string);});}),
      tap((response) => this.banksWithBranch = response),
      map((response: BanksGetResponse[]) => {
        return response.map((item): IdAndNameResponse => ({
          ...item,
          id: Number(item.id) as number,
          name: item.name as string
        }));
      }),
      // tap((response) => this.banks = response),
    ).subscribe();
    // banks => {
    //   this.banks = banks;
    // }
  }

  public sendRequest(): void {
    // this.configContext.completeWith('j');
    this.currentStorageData.bankName = this.accountForm.value.bankName as string;
    this.currentStorageData.accountNumber = this.accountForm.value.accountNumber as string;
    this.currentStorageData.branchNumber = this.accountForm.value.branchNumber as string;
    this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
    this.registerService.apiEmployersCreatePaymentOut({
      branchId: this.currentStorageData.branchNumber,
      accountNumber: this.currentStorageData.accountNumber,
      departmentId: this.currentStorageData.departmentId,
      payBySmarti: false,
    }).pipe().subscribe(() => this.observer.complete());
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
