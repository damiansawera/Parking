import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarPopupComponent } from './add-car-popup.component';

describe('AddCarPopupComponent', () => {
  let component: AddCarPopupComponent;
  let fixture: ComponentFixture<AddCarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
