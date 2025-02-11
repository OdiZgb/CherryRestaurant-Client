import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShipmentParentComponent } from './display-shipment-parent.component';

describe('DisplayShipmentParentComponent', () => {
  let component: DisplayShipmentParentComponent;
  let fixture: ComponentFixture<DisplayShipmentParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayShipmentParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayShipmentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
