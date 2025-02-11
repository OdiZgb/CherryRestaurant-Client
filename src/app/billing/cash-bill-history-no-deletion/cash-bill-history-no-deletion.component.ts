import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills/bills.service';
import { HistoryOfCashBill } from 'src/app/DTOs/HistoryOfCashBill';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'cash-bill-history-no-deletion',
  templateUrl: './cash-bill-history-no-deletion.component.html',
  styleUrls: ['./cash-bill-history-no-deletion.component.scss'],
  providers: [MessageService]
})
export class CashBillHistoryNoDeletionComponent implements OnInit {
  cashBills: HistoryOfCashBill[] = [];
  groupedBills: { [key: number]: HistoryOfCashBill[] } = {};
  billKeys: number[] = [];
  loading: boolean = true;
  searchText: string = '';
  selectedBills: HistoryOfCashBill[] = [];

  constructor(private billsService: BillsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCashBills();
  }

  loadCashBills(): void {
    this.billsService.GetDeletedCash$().subscribe((data: HistoryOfCashBill[]) => {
      // Filter out bills that have any items with SoftDeleted set to 1
      const filteredBills = this.filterOutSoftDeletedBills(data);
      this.cashBills = filteredBills;
      this.groupBillsByBillId();
      this.loading = false;
    });
  }

  filterOutSoftDeletedBills(data: HistoryOfCashBill[]): HistoryOfCashBill[] {
    const billsGroupedById = data.reduce((acc, bill) => {
      const billId = bill.billId ?? 0;
      if (!acc[billId]) {
        acc[billId] = [];
      }
      acc[billId].push(bill);
      return acc;
    }, {} as { [key: number]: HistoryOfCashBill[] });

    return Object.values(billsGroupedById)
      .filter(bills => !bills.some(bill => bill.SoftDeleted == 1))
      .flat();
  }

  groupBillsByBillId(): void {
    this.groupedBills = this.cashBills.reduce((acc, bill) => {
      const billId = bill.billId ?? 0;
      if (!acc[billId]) {
        acc[billId] = [];
      }
      acc[billId].push(bill);
      return acc;
    }, {} as { [key: number]: HistoryOfCashBill[] });

    this.billKeys = Object.keys(this.groupedBills).map(key => +key).sort((a, b) => b - a);
  }

  clear() {
    this.searchText = '';
    this.filterData();
  }

  filterData() {
    if (this.searchText) {
      const filtered = this.cashBills.filter(bill =>
        bill.itemName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.clientName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.employeeName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.barcode?.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.groupedBills = filtered.reduce((acc, bill) => {
        const billId = bill.billId ?? 0;
        if (!acc[billId]) {
          acc[billId] = [];
        }
        acc[billId].push(bill);
        return acc;
      }, {} as { [key: number]: HistoryOfCashBill[] });
      this.billKeys = Object.keys(this.groupedBills).map(key => +key).sort((a, b) => b - a);
    } else {
      this.groupBillsByBillId();
    }
  }


}
