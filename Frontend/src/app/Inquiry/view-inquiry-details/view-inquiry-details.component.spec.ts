import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInquiryDetailsComponent } from './view-inquiry-details.component';

describe('ViewInquiryDetailsComponent', () => {
  let component: ViewInquiryDetailsComponent;
  let fixture: ComponentFixture<ViewInquiryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInquiryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInquiryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
