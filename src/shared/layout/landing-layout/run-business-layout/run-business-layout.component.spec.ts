import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunBusinessLayoutComponent } from '@shared/layout';

describe('RunBusinessLayoutComponent', () => {
  let component: RunBusinessLayoutComponent;
  let fixture: ComponentFixture<RunBusinessLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RunBusinessLayoutComponent],
    });
    fixture = TestBed.createComponent(RunBusinessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
