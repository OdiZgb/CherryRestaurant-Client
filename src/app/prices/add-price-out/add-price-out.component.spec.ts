import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceOutComponent } from './add-price-out.component';

describe('AddPriceOutComponent', () => {
  let component: AddPriceOutComponent;
  let fixture: ComponentFixture<AddPriceOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriceOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
