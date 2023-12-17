import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { placeholder, slideToggle } from 'app/shared/_animations/animation';

@Component({
  selector: 'bd-select' ,
  templateUrl: './bd-select.component.html',
  styleUrls: ['./bd-select.component.css'],
  // animations: [ slideToggle, placeholder],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BdSelectComponent, multi: true }
  ]
})

export class BdSelectComponent implements ControlValueAccessor , OnChanges {

  @Input() public multiple = false;
  @Input() public value = 'id';
  @Input() public label = 'name';
  @Input() public items = [];
  @Input() public unfilteredItems = [];
  @Input() public placeholder = 'בחר פריטים';
  @Input() public searchPlaceholder = 'חפש...';
  @Input() public clientSideSearch = true;
  @Input() public searchableProperties = false;
  @Input() public error = false;
  public filterValue: string;
  @Output('f') onSelect: EventEmitter<NonNullable<unknown> | NonNullable<unknown>[]> = new EventEmitter();
  @Output() onDeselect: EventEmitter<boolean> = new EventEmitter();
  @Output() onScroll: EventEmitter<number> = new EventEmitter();
  @Output() serverFilter: EventEmitter<string> = new EventEmitter();

  @Input() @HostBinding('style.width') width = '100%';
  @Input() differentPlaceHolder = false;
  @ViewChild('filterValueEle') filterElement: ElementRef| undefined;
  @ViewChild('optionsEle') optionsElement: ElementRef| undefined;
  //
  // unfilteredItems = [];

  isSelectOpened = false;

  elementRef: ElementRef;

  selectedItem: any;

  private propagateChange = (_: any) => {};

  constructor(el: ElementRef) {
    this.elementRef = el;
  }

  @HostListener('document:click')
  documentClicked() {
    if (!this.isSelectOpened) {
      return;
    }

    let clickedComponent: ParentNode | null = event?.target as HTMLElement;
    let inside = false;

    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }

      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if (!inside) {
      this.isSelectOpened = false;
      setTimeout(() => {
        this.filterValue = '';

        if (this.unfilteredItems.length > 0) {
          this.items = this.unfilteredItems;
        }

      }, 500);
    }
  }


  filter(): void {
    if (this.clientSideSearch) {
      if (this.unfilteredItems.length === 0) {
        this.unfilteredItems = this.items;
      }


      // if (this.unfilteredItems.length === 0 ||
      //   this.unfilteredItems.length !== this.items.length ||
      //   (this.unfilteredItems.length > 0 &&  this.items.length > 0 && this.unfilteredItems[1]['id'] !==  this.items[1]['id']))  {
      //   this.unfilteredItems = this.items;
      // }



      if (!this.searchableProperties) {
        // this.items = this.unfilteredItems.filter(item => item[this.label].indexOf(this.filterValue) !== -1);
      } else {
        // this.items = this.unfilteredItems.filter(item =>
        //   Object.keys(item).some(k => item[k] != null &&
        //     item[k].toString().toLowerCase()
        //       .includes(this.filterValue.toLowerCase()))
        // );
      }
    } else {
      // event.target.parentElement.parentElement.id
       this.serverFilter.emit( this.filterValue);
    }
  }

  selectOption(item: NonNullable<unknown> | NonNullable<unknown>[]): void {

    let output;

    if (!this.multiple) {
      this.selectedItem = item;
      this.isSelectOpened = false;

      output = this.selectedItem[this.value];
    }

    if (this.multiple) {
      if (!this.selectedItem) {
        this.selectedItem = [];
      }

      let isSelect = true;
      this.selectedItem.some((selectedItem, index) => {
        if (item[this.value] === selectedItem[this.value]) {
          isSelect = false;

          this.selectedItem.splice(index, 1);
          if (this.selectedItem.length === 0) {
            this.selectedItem = null;
          }

          return;
        }
      });
      let isSelectAll = false;
      if (this.selectedItem) {
        this.selectedItem.some((selectedItem) => {
          if (0 === selectedItem[this.value]) {
            isSelectAll = true;
            return;
          }
        });
      }

      if (isSelect && !isSelectAll) {
        if ( item[this.value] === 0) {
          this.selectedItem = [];
        }
        this.selectedItem.push(item);
      }



      if (this.selectedItem != null) {
        output = this.selectedItem.map(outputItem => {
          return outputItem[this.value]  || outputItem[this.value] === 0 ? outputItem[this.value] : outputItem;
        });
      }
    }

    this.propagateChange(output);
    setTimeout(() => {
      this.filterValue = '';

      if (this.unfilteredItems.length > 0) {
        this.items = this.unfilteredItems;
      }

    }, 500);
    this.onSelect.emit(output);
  }

  openDropdown(): void {
    this.isSelectOpened = !this.isSelectOpened;
    setTimeout(() => this.filterElement.nativeElement.focus(), 0);
  }

  checkIsSelected(item: any): boolean {
    if (!this.selectedItem) {
      return false;
    }

    if (!this.multiple) {
      return (item === this.selectedItem);
    }

    return this.selectedItem.some(selectedItem => {
      if (selectedItem[this.value] === item[this.value]) {
        return true;
      }
    });
  }

  checkIsUnSelected(item: any): boolean {
    if (!this.selectedItem || !this.multiple) {
      return false;
    }

    let isSelectAll = false;
    this.selectedItem.some((selectedItem) => {
      if (0 === selectedItem[this.value]) {
        isSelectAll = true;
        return;
      }
    });

    if (isSelectAll) {
      if (item[this.value] !== 0) {
          return true;
      }
    } return false;
  }

  ngOnChanges() {
    if (this.selectedItem) {
      this.setSelectedItem(this.selectedItem);
    }
  }

  getLabel(item: string): string {

    if (!Array.isArray(this.label)) {
      return item[this.label];
    }

    let labels = '';
    for (const i in this.label) {
      labels += item[this.label[i]] + ' - ';
    }

    return labels.slice(0, -3);
  }

  private setSelectedItem(value: any): boolean {
    if (this.multiple) {
       this.setSelectedItemMultiple(value);
       return true;
    } else {
      return this.items.some(item => {
        if (value.toString() === item[this.value].toString()) {
          this.selectedItem = item;
          this.onSelect.emit(item[this.value]);
          return true;
        }
      });
    }
  }

  setSelectedItemMultiple(values: any[]): void {
    const items = [];
    this.items.forEach(item => {
      const iteratedItem = item[this.value].toString();
      if (values.indexOf(iteratedItem) !== -1) {
         items.push(iteratedItem);
         if (this.selectedItem) {
           this.selectedItem = this.selectedItem.filter(outputItem => {
             if (outputItem[this.value]) {
               return outputItem[this.value];
             }
           });
         }else {
           this.selectedItem = [];
         }
         this.selectedItem.push(item);
      }
    });
    if ( this.items.length === 0) {
      this.selectedItem = values;
    }

    this.onSelect.emit(items);
  }

  writeValue(value: any): void {
  // && typeof value !== 'object'
    if (value ) {
      if (!this.setSelectedItem(value)) {
         this.selectedItem = value;
      }
    } else {
        this.selectedItem = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {

  }

  public setDisabledState(isDisabled: boolean): void {

  }
}
// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   HostBinding,
//   HostListener,
//   Input,
//   Output,
//   ViewChild,
//   QueryList, ContentChildren, AfterContentInit, OnDestroy
// } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { Subscription } from 'rxjs';
// import { BdOptionComponent } from 'assets/js/bd-select/bd-option/bd-option.component';
//
// @Component({
//   selector: 'bd-select',
//   templateUrl: './bd-select.component.html',
//   styleUrls: ['./bd-select.component.css'],
//   animations: [
//     trigger('slideToggle', [
//       state('inactive', style({
//         display: 'none',
//         height: '0',
//         opacity: '0'
//       })),
//       state('active', style({
//         display: 'block',
//         height: '*',
//         opacity: '1'
//       })),
//       transition('active => inactive', animate('0ms ease-in')),
//       transition('inactive => active', animate('0ms ease-out'))
//     ]),
//     trigger('placeholder', [
//       state('inactive', style({
//         fontSize: '*',
//         top: '*',
//         color: '*',
//         fontWeight: 'normal'
//       })),
//       state('active', style({
//         top: '-12px',
//         fontSize: '12px',
//         color: '#000',
//         opacity: '.54',
//         fontWeight: 'bold'
//       })),
//       transition('active => inactive', animate('300ms ease-in')),
//       transition('inactive => active', animate('300ms ease-in'))
//     ])
//   ],
//   providers: [
//     { provide: NG_VALUE_ACCESSOR, useExisting: BdSelectComponent, multi: true }
//   ]
// })
// export class BdSelectComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
//
//   // @Input() @HostBinding('style.max-width') width = '300px';
//   @Input() optionsHeight = '280px';
//   @Input() multiple = false;
//   @Input() items = [];
//   @Input() isBorderBottom =true;
//   @Input() placeholder = 'בחר פריטים';
//   @Input() searchPlaceholder = 'חפש...';
//   @Input() scrollBottom = false;
//   @Input() error = false;
//
//   @Output() selected: EventEmitter<any> = new EventEmitter();
//   @Output() deselected: EventEmitter<boolean> = new EventEmitter();
//
//   @HostBinding('class.unfiltered') private unfiltered: boolean;
//
//   @ContentChildren(BdOptionComponent) options: QueryList<BdOptionComponent>;
//
//   @ViewChild('dropdown', { static: false }) dropdown: ElementRef;
//
//   readonly sub = new Subscription();
//
//   filterValue: string;
//
//   isSelectOpened = false;
//
//   initialValue: any;
//
//   value: any;
//   label: any;
//   activeOption: BdOptionComponent;
//
//   constructor(private elementRef: ElementRef) {}
//
//   ngAfterContentInit() {
//     if (this.multiple) {
//       this.value = [];
//       this.label = [];
//     }
//
//     this.sub.add(this.options.changes.subscribe(() => {
//       this.listenOptionsClicked();
//     }));
//
//     setTimeout(() => this.listenOptionsClicked(), 0);
//   }
//
//   private listenOptionsClicked(): void {
//     this.options.forEach(option => {
//       this.sub.add(option.clicked.subscribe(isClicked => {
//         this.optionClickedHandler(option, isClicked);
//       }));
//
//       if (this.initialValue &&
//         (this.multiple && this.initialValue.indexOf(option.value) !== -1) ||
//         (!this.multiple && this.initialValue === option.value)) {
//         option.onClick();
//       }
//     });
//   }
//
//   private optionClickedHandler(option: BdOptionComponent, isClicked: boolean): void {
//     if (isClicked) {
//       if (this.multiple) {
//         this.value.push(option.value);
//         this.label.push(option.label);
//       } else {
//         if (this.activeOption && this.activeOption !== option) {
//           this.activeOption.selected = false;
//         }
//
//         this.value = option.value;
//
//         this.label = option.label;
//         this.activeOption = option;
//
//         this.isSelectOpened = false;
//       }
//     } else {
//       if (this.multiple) {
//         this.value.splice(this.value.findIndex(item => item === option.value), 1);
//         this.label.splice(this.label.findIndex(item => item === option.label), 1);
//       } else {
//         this.value = null;
//         this.label = null;
//       }
//     }
//
//     this.selected.emit(this.value);
//     this.propagateChange(this.value);
//   }
//
//   filter(): void {
//     const filterValue = this.filterValue.toString().toLowerCase();
//     if (!filterValue) {
//       this.unfiltered = true;
//       return;
//     }
//
//     this.unfiltered = false;
//
//     this.options.forEach(option => {
//       const filtered = option.label.indexOf(filterValue) === -1;
//       option.toggleDisplay(filtered);
//     });
//   }
//
//   resetValue(event: MouseEvent): void {
//     event.stopPropagation();
//
//     this.value = null;
//     this.label = null;
//
//     this.deselected.emit(true);
//     this.propagateChange(null);
//   }
//
//   openDropdown(): void {
//     this.isSelectOpened = !this.isSelectOpened;
//     if (this.isSelectOpened && this.scrollBottom) {
//       this.scrollToBottom();
//     }
//   }
//
//   scrollToBottom(): void {
//     setTimeout(() => this.dropdown.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' }), 360);
//   }
//
//   private propagateChange = (_: any) => {};
//
//   writeValue(value: any): void {
//     if (value) {
//       this.initialValue = value;
//     }
//   }
//
//   registerOnChange(fn: any) {
//     this.propagateChange = fn;
//   }
//
//   registerOnTouched(fn: any): void {
//
//   }
//
//   setDisabledState(isDisabled: boolean): void {
//
//   }
//
//   @HostListener('document:click')
//   documentClicked() {
//     if (!this.isSelectOpened) {
//       return;
//     }
//
//     let clickedComponent = event.target;
//     let inside = false;
//
//     do {
//       if (clickedComponent === this.elementRef.nativeElement) {
//         inside = true;
//       }
//
//       clickedComponent = clickedComponent['parentNode'];
//     } while (clickedComponent);
//
//     if (!inside) {
//       this.isSelectOpened = false;
//       setTimeout(() => {
//         this.filterValue = '';
//         this.unfiltered = true;
//       }, 500);
//     }
//   }
//
//   ngOnDestroy() {
//     this.sub.unsubscribe();
//   }
// }
