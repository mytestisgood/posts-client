import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDocumentComponent } from '@feature';

describe('UploadDocumentComponent', () => {
  let component: UploadDocumentComponent;
  let fixture: ComponentFixture<UploadDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadDocumentComponent],
    });
    fixture = TestBed.createComponent(UploadDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
