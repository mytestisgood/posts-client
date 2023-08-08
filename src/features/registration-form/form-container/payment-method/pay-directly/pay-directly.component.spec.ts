import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDirectlyComponent } from '@feature';

describe('PayDirectlyComponent', () => {
  let component: PayDirectlyComponent;
  let fixture: ComponentFixture<PayDirectlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PayDirectlyComponent],
    });
    fixture = TestBed.createComponent(PayDirectlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
