import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileComponent } from '@shared/layout';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadFileComponent],
    });
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
