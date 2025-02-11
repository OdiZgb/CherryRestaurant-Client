import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentInhistoryComponent } from './shipment-inhistory.component';

describe('ShipmentInhistoryComponent', () => {
  let component: ShipmentInhistoryComponent;
  let fixture: ComponentFixture<ShipmentInhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentInhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentInhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
