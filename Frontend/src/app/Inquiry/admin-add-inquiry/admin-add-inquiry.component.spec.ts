import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddInquiryComponent } from './admin-add-inquiry.component';

describe('AdminAddInquiryComponent', () => {
  let component: AdminAddInquiryComponent;
  let fixture: ComponentFixture<AdminAddInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
