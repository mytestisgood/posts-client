import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsComponent } from '@shared/layout';

describe('FeedsComponent', () => {
  let component: FeedsComponent;
  let fixture: ComponentFixture<FeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedsComponent],
    });
    fixture = TestBed.createComponent(FeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
