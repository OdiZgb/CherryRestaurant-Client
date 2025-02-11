import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBarcodesPageComponent } from './print-barcodes-pagecomponent';

describe('PrintBadcodesPageComponent', () => {
  let component: PrintBarcodesPageComponent;
  let fixture: ComponentFixture<PrintBarcodesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBarcodesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBarcodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
