import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipmentDialogComponent } from './add-shipment-dialog.component';

describe('AddShipmentDialogComponent', () => {
  let component: AddShipmentDialogComponent;
  let fixture: ComponentFixture<AddShipmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShipmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
