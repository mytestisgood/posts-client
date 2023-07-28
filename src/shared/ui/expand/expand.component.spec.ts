import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandComponent } from '@shared/ui';

describe('ExpandComponent', () => {
  let component: ExpandComponent;
  let fixture: ComponentFixture<ExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpandComponent],
    });
    fixture = TestBed.createComponent(ExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
