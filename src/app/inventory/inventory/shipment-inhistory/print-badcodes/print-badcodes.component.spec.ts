import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBadcodesComponent } from './print-badcodes.component';

describe('PrintBadcodesComponent', () => {
  let component: PrintBadcodesComponent;
  let fixture: ComponentFixture<PrintBadcodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBadcodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBadcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
