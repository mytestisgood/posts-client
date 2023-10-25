import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsideProcessDialogComponent } from '@shared/dialog';

describe('AsideProcessDialogComponent', () => {
  let component: AsideProcessDialogComponent;
  let fixture: ComponentFixture<AsideProcessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AsideProcessDialogComponent],
    });
    fixture = TestBed.createComponent(AsideProcessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
