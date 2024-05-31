import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnparkCarPopupComponent } from './unpark-car-popup.component';

describe('UnparkCarPopupComponent', () => {
  let component: UnparkCarPopupComponent;
  let fixture: ComponentFixture<UnparkCarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnparkCarPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnparkCarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
