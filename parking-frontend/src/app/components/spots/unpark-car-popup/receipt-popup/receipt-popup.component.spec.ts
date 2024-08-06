import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptPopupComponent } from './receipt-popup.component';

describe('ReceiptPopupComponent', () => {
  let component: ReceiptPopupComponent;
  let fixture: ComponentFixture<ReceiptPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
