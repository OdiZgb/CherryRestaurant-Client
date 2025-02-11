import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBillHistoryComponent } from './cash-bill-history.component';

describe('CashBillHistoryComponent', () => {
  let component: CashBillHistoryComponent;
  let fixture: ComponentFixture<CashBillHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBillHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashBillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
