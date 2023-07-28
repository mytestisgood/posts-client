import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForwardRequestDialogComponent } from '@shared/dialog';

describe('ForwardRequestDialogComponent', () => {
  let component: ForwardRequestDialogComponent;
  let fixture: ComponentFixture<ForwardRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForwardRequestDialogComponent],
    });
    fixture = TestBed.createComponent(ForwardRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
