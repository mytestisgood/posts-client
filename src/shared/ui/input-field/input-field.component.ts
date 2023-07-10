import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'smarti-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements OnInit, AfterViewInit {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public customClass: string = '';
  @Input() public minLength!: string | number | null;
  public formInput: FormControl<string | null> = new FormControl('');

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
