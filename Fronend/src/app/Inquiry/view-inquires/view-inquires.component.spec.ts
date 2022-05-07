import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInquiresComponent } from './view-inquires.component';

describe('ViewInquiresComponent', () => {
  let component: ViewInquiresComponent;
  let fixture: ComponentFixture<ViewInquiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInquiresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
