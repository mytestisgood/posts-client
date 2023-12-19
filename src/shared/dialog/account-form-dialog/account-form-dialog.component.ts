import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AccountControls,
  AllRegistrationSessionData, ChatListItems,
  paymentMethodFormMapper,
  REGISTRATION_DATA,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent, InputNumberComponent, SelectComponent } from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { map, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { BankService, ChatService, RegisterService } from '@shared/api/services';
import { BankBranches, BanksGetResponse, ChatResponse, IdAndNameResponse } from '@shared/api/models';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {isMobile} from '@shared/helpers';

@Component({
  selector: 'smarti-account-form-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ReactiveFormsModule, ButtonComponent, SelectComponent, InputNumberComponent],
  templateUrl: './account-form-dialog.component.html',
  styleUrls: ['./account-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDialogService, { provide: POLYMORPHEUS_CONTEXT, useExisting: TuiDialogService }],
})
export class AccountFormDialogComponent implements OnInit {
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '616px'
  @Input() public observer!: { complete: () => void };
  public accountForm: FormGroup<AccountControls> = paymentMethodFormMapper();
  public isDisabled: boolean = true;
  public banks!: IdAndNameResponse[];
  public bank_branches!: IdAndNameResponse[];
  public banksWithBranch!: BanksGetResponse[];
  // public chatSubject$: Observable<IdAndNameResponse[]> = this.accountForm.apiGeneralsBanksGet();
  @Output() public resultEmitter: EventEmitter<any> = new EventEmitter<any>(); // Output to emit result
  public accountFormChange$: Observable<FormControlStatus> = this.accountForm
    .statusChanges.pipe(takeUntil(this.destroy$));
  private readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
  private readonly value: number | null = null;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,

    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<number, number>,

    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly bankService: BankService,
    private readonly chatService: ChatService,
    private readonly registerService: RegisterService,

  ) {
  }

  public ngOnInit(): void {
    if (this.currentStorageData.accountNumber){
      this.accountForm.setValue({
        bankName:  this.currentStorageData.bank as IdAndNameResponse,
        accountNumber: this.currentStorageData.accountNumber,
        branchNumber:  this.currentStorageData.branch as IdAndNameResponse
      })
    }
    this.isDisabled = !this.accountForm.valid;
    this.accountForm.updateValueAndValidity({ emitEvent: true });
    this.accountFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
    this.loadBanks();
    this.accountForm.get('bankName')?.valueChanges.pipe(
      switchMap((value) => {
        if (value) {
          const branches = this.banksWithBranch.find(item => Number(item.id) === value.id)?.bank_branches;

          if (branches) {
            this.bank_branches = branches.map((e) => {
              return <IdAndNameResponse>{ id: Number(e.id), name: e.name };
            });
            this.accountForm.patchValue({
              branchNumber: null,
            });
          }
        }
        return of();
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public loadBanks(): void {
    this.bankService.apiGeneralsBanksGet({ withBranches: true }).pipe(
      tap((response) => {
        this.banksWithBranch = response;
        this.banks = this.banksWithBranch.map((e) => {
          return <IdAndNameResponse>{ id: Number(e.id), name: e.name };
        });

      }),
    ).subscribe();
  }

  public sendRequest(): void {
    // this.context.$implicit.complete();

    // this.configContext.completeWith('j');
    this.currentStorageData.bank = this.accountForm.value.bankName as IdAndNameResponse;
    this.currentStorageData.accountNumber = this.accountForm.value.accountNumber as string;
    this.currentStorageData.branch = this.accountForm.value?.branchNumber as IdAndNameResponse;
    this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
    this.registerService.apiEmployersUpdatePaymentOut({
      branchId: this.accountForm.value.branchNumber?.id,
      accountNumber: this.currentStorageData.accountNumber,
      departmentId: this.currentStorageData.departmentId,
    }).pipe().subscribe(() =>
      this.observer.complete());
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  private get data(): number {
    return this.context.data;
  }
}
