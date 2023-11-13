import {	Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelpersService} from '../../services/helpers.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
	animations: [
		trigger('placeholder', [
			state('true', style({ top: '*', color: '*'})),
			state('false', style({ top: '-1px', color: '#343355', margin: '0 5px' })),
			transition('false <=> true', animate(200))
		]),
		trigger('slideDown', [
			transition(':leave', [
				animate(200, style({ height: '0', opacity: '0'}))
			]),
			transition(':enter', [
				style({ height: 0, opacity: 0 }),
				animate(200, style({ opacity: 1, height: '*'}))
			]),
		]),
		trigger('selectToggle', [
			transition(':leave', [
				animate(200, style({ height: '0', opacity: '0'}))
			]),
			transition(':enter', [
				style({ height: 0, opacity: 0 }),
				animate(200, style({ opacity: 1, height: '*'}))
			]),
		])],
	providers: [
		{provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
	]
})
export class SelectComponent implements ControlValueAccessor, OnChanges {
	@Input() truncate = false;
	@Input() multiple = false;
	@Input() label: any = 'name';
	@Input() items = [];
	@Input() placeholder = '';
	@Input() searchPlaceholder = 'חפש...';
	@Input() enableSelectAll = false;
	@Input() selectAllPlaceholder = 'בחר הכל';
	@Input() searchableProperties = true; /// todo refactor to searchable
	@Input() error = false;
	@Input() errorMessage = 'שדה חובה';
	@Input() required = false;
	@Input() multiSearch = false;			  /// search in all the keys
	@Input() outputField?: string;
	@Input() optionsHeight = '280px';
	@Input() disabled = false;
	@Input() showSelectedItem = true;
	@Input() scrollBottom = false;
	@Input() direction = 'down';
	@Input() template: 'primary' | 'secondary' = 'primary';
	@Output() onSelect: EventEmitter<object | object[]> = new EventEmitter();

	@Input() @HostBinding('style.width') width = '100%';
	@HostBinding('tabindex') tabindex = 0;

	@ViewChild('filterValueEle', { static: true }) filterElement: ElementRef;
	@ViewChild('dropdown') dropdown: ElementRef;

	filterValue: string;
	unfilteredItems = [];
	isSelectOpened = false;
	allItemsSelected = false;
	elementRef: ElementRef;
	selectedItem: any;

	private propagateChange = (_: any) => { };

	constructor(el: ElementRef, private helpers: HelpersService) {
		this.elementRef = el;
	}

	@HostListener('focus')
	focusHandler() {
		this.openDropdown();
	}

	@HostListener('document:click')
	documentClicked() {
		if (!this.isSelectOpened) {
			return;
		}
		let clickedComponent = event.target;
		let inside = false;

		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}

			clickedComponent = clickedComponent['parentNode'];
		} while (clickedComponent);

		if (!inside) {
			this.closeDropDown();
			setTimeout(() => {
				this.filterValue = '';

				if (this.unfilteredItems.length > 0) {
					this.items = this.unfilteredItems;
				}

			}, 500);
		}
	}

	filter(): void {
		if (this.unfilteredItems.length === 0) {
			this.unfilteredItems = this.items;
		}
		const filterValue = this.filterValue ? this.filterValue.toString().toLowerCase() : '';

		if (!this.multiSearch) {
			this.items = this.unfilteredItems.filter(item => item[this.label].toString().toLowerCase().indexOf(filterValue) !== -1);
		} else {
			this.items = this.unfilteredItems.filter(item => {
					return Object.keys(item).some(k =>
						item[k] != null && item[k].toString().toLowerCase().indexOf(filterValue) !== -1
					)
				}
			);
		}
	}

	selectAllItems(): void {
		this.selectedItem = [];
		if (!this.allItemsSelected) {
			this.items.forEach(item => {
				this.selectedItem.push(item)
			})
		}
		if (this.selectedItem.length  === 0) {
			this.selectedItem = null;
		}
		this.allItemsSelected = !this.allItemsSelected;

		this.propagateChange(this.selectedItem);
		this.onSelect.emit(this.selectedItem)
	}

	selectOption(item: object | object[]): void {
		if (!this.multiple) {
			this.isSelectOpened = false;
			this.selectedItem = this.selectedItem !== item ? item : null;
		} else {
			if (!this.selectedItem) {
				this.selectedItem = [];
			}
			let isSelect = true;
			this.selectedItem.some((sItem, index) => {
				if (this.isSameItem(item, sItem)) {
					isSelect = false;
					this.allItemsSelected = false;
					this.selectedItem.splice(index, 1);
					if (this.selectedItem.length === 0) {
						this.selectedItem = null;
					}
					return;
				}
			});
			if (isSelect) {
				this.selectedItem.push(item);
			}
		}
		let selectedItem = null;
		if (this.selectedItem) {
			if (this.multiple) {
				selectedItem = this.selectedItem
					.map(selected => {
						if (this.outputField) {
							return selected[this.outputField];
						} else {
							return selected;
						}
					});
			} else {
				selectedItem = this.outputField && this.selectedItem ? this.selectedItem[this.outputField] : this.selectedItem;
			}
		}
		this.propagateChange(selectedItem);
		this.onSelect.emit(selectedItem);
		if (!this.multiple) {
			this.elementRef.nativeElement.blur();
		}
	}

	openDropdown(): void {
		if (this.disabled) {
			return;
		}
		this.isSelectOpened = true;
		if (this.isSelectOpened && this.scrollBottom) {
			this.scrollToBottom();
		}

		if (this.filterElement) {
			setTimeout(() => this.filterElement.nativeElement.focus(), 0);
		}
	}

	scrollToBottom(): void {
		setTimeout(() => this.dropdown.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end'}), 360);
	}

	checkIsSelected(item: any): boolean {
		if (!this.selectedItem) {
			return false;
		}
		if (!this.multiple) {
			return this.isSameItem(this.selectedItem, item);
		}
		return this.selectedItem.some(selectedItem => this.isSameItem(selectedItem, item));
	}

	private isSameItem(item1, item2): boolean {
		if (this.outputField && item1.hasOwnProperty(this.outputField) && item2.hasOwnProperty(this.outputField)) {
			return item1[this.outputField] === item2[this.outputField];
		}
		return this.helpers.areObjectsEqual(item1, item2);
	}

	ngOnChanges() {
		this.unfilteredItems = [];
		if (this.selectedItem && typeof this.selectedItem !== 'object') {
			this.setSelectedItemObject(this.selectedItem);
		}
	}

	getLabel(item: object): string {
		if (!Array.isArray(this.label)) {
			if (item[this.label]) {
				return item[this.label];
			}
			if (Array.isArray(item)) {
				return null;
			}

			const itemFromList = this.items.find(selectableItem=> selectableItem.id === item['id']);
			if (!itemFromList) {
				return null;
			}
			return itemFromList.name;
		}

		let labels = '';
		for(const i in this.label) {
			if(this.label.hasOwnProperty(i)) {
				labels += item[this.label[i]] + ' - ';
			}
		}
		return labels.slice(0, -3);
	}

	private setSelectedItemObject(value: any): void {
		this.items.forEach(item => {
			if (typeof value === 'object') {
				value = value[this.outputField];
			}
			if(this.isSameItem(value, item[this.outputField])) {
				this.selectOption(item)
			}
		});
	}

	writeValue(value: any): void {
		if (Array.isArray(value)) {
			value.forEach(item => this.setSelectedItemObject(item));
		} else {
			if (value != null && typeof value !== 'object') {
				this.setSelectedItemObject(value)
			} else {
				this.selectedItem = value;
			}
		}
	}

	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any): void { }

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	closeDropDown() {
		this.isSelectOpened = false;
	}
}
