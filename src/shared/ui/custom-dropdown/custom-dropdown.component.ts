import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { DestroyService, DropdownService } from '@shared/services';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiDropdownModule } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-custom-dropdown',
  standalone: true,
  imports: [CommonModule, TuiDropdownModule, TuiActiveZoneModule, TuiObscuredModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDropdownComponent implements OnInit {
  @Input() public customContent!: TemplateRef<HTMLElement>;
  @Input() public isOpen: boolean = false;
  @Output() public clickEvent: Subject<void> = new Subject();
  @Output() public activeZoneChangeEvent: Subject<boolean> = new Subject();

  constructor(
    private readonly dropdownService: DropdownService,
    private readonly destroy$: DestroyService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.dropdownService.isOpenValueChange.pipe(
      takeUntil(this.destroy$),
    ).subscribe(value => {
      this.isOpen = value;
      this.changeDetectorRef.detectChanges();
    });
  }

  public onClick(): void {
    this.isOpen = !this.isOpen;
    this.clickEvent.next();
  }

  public onObscured(obscured: boolean): void {
    if (obscured) {
      this.isOpen = false;
    }
  }

  public onActiveZone(active: boolean): void {
    this.isOpen = active && this.isOpen;
    this.activeZoneChangeEvent.next(active);
  }
}
