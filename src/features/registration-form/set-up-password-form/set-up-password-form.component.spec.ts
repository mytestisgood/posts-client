import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpPasswordFormComponent } from '@feature';

describe('SetUpPasswordFormComponent', () => {
  let component: SetUpPasswordFormComponent;
  let fixture: ComponentFixture<SetUpPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SetUpPasswordFormComponent],
    });
    fixture = TestBed.createComponent(SetUpPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
