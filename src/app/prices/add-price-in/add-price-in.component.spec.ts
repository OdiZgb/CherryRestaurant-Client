import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceInComponent } from './add-price-in.component';

describe('AddPriceInComponent', () => {
  let component: AddPriceInComponent;
  let fixture: ComponentFixture<AddPriceInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriceInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
