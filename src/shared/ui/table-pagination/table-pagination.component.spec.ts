import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePaginationComponent } from '@shared/ui';

describe('TablePaginationComponent', () => {
  let component: TablePaginationComponent;
  let fixture: ComponentFixture<TablePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TablePaginationComponent],
    });
    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
