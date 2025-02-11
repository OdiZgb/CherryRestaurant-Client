import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBillHistoryNoDeletionComponent } from './cash-bill-history-no-deletion.component';

describe('CashBillHistoryNoDeletionComponent', () => {
  let component: CashBillHistoryNoDeletionComponent;
  let fixture: ComponentFixture<CashBillHistoryNoDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBillHistoryNoDeletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashBillHistoryNoDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
