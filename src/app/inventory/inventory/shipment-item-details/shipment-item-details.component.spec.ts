import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentItemDetailsComponent } from './shipment-item-details.component';

describe('ShipmentItemDetailsComponent', () => {
  let component: ShipmentItemDetailsComponent;
  let fixture: ComponentFixture<ShipmentItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
