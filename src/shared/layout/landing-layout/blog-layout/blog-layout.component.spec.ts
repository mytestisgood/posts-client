import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogLayoutComponent } from '@shared/layout';

describe('BlogLayoutComponent', () => {
  let component: BlogLayoutComponent;
  let fixture: ComponentFixture<BlogLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlogLayoutComponent],
    });
    fixture = TestBed.createComponent(BlogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
