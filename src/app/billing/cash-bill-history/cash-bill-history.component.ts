import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills/bills.service';
import { HistoryOfCashBill } from 'src/app/DTOs/HistoryOfCashBill';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';  // Assuming EmployeeDTO exists

@Component({
  selector: 'app-cash-bill-history',
  templateUrl: './cash-bill-history.component.html',
  styleUrls: ['./cash-bill-history.component.scss'],
  providers: [MessageService]
})
export class CashBillHistoryComponent implements OnInit {
  cashBills: HistoryOfCashBill[] = [];
  groupedBills: { [key: number]: HistoryOfCashBill[] } = {};
  billKeys: number[] = [];
  loading: boolean = true;
  searchText: string = '';
  selectedBills: HistoryOfCashBill[] = [];
  years: number[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selectedDate: FormControl = new FormControl(null);
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  selectedEmployee: string | null = null; // Store selected employee
  employeeNames: { [key: string]: string } = {};  // Store employees with their names
  EmployeeController: FormControl = new FormControl(null); // FormControl for employee input
  totalCostWithDiscount: number = 0;  // This will apply the discount

  constructor(private billsService: BillsService, private messageService: MessageService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadCashBills();
    this.generateYears();
    this.loadEmployeeNames();  // Load employee names for autocomplete
  }

  formatDateTime(dateTime: Date): string {
    return formatDate(dateTime, 'dd/MM/yyyy HH:mm', 'en-US');
  }

  calculateTotalPrice(bills: HistoryOfCashBill[]): number {
    return bills.reduce((total, bill) => total + (bill.itemCostOut || 0), 0);
  }
  deleteBill(billId: number): void {
    this.billsService.deleteCashBill$(billId).subscribe(() => {
      this.cashBills = this.cashBills.filter(bill => bill.billId !== billId);
      this.groupBillsByBillId();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill deleted successfully' });

    },e=>{},()=>{      ;
    });
    setTimeout(() => {
      window.location.reload()
    }, 1100);
  }

  loadCashBills(): void {
    this.billsService.GetCash$().subscribe((data: HistoryOfCashBill[]) => {
      console.log('Raw Cash Bills:', data);  // Debugging the raw data returned by the API
      const filteredBills = this.filterOutSoftDeletedBills(data);
      console.log('Filtered Cash Bills:', filteredBills); // Check filtered bills
      this.cashBills = filteredBills;
      this.generateYears();  // Call generateYears after setting cashBills
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
      .filter(bills => !bills.some(bill => bill.SoftDeleted === 1))
      .flat();
  }

  groupBillsByBillId(filteredBills: HistoryOfCashBill[] = this.cashBills): void {
    this.groupedBills = filteredBills.reduce((acc, bill) => {
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
    let filteredBills = this.cashBills;
  
    if (this.searchText) {
      filteredBills = filteredBills.filter(bill =>
        bill.itemName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.clientName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.employeeName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.barcode?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    // Filter by employee
    if (this.selectedEmployee) {
      filteredBills = filteredBills.filter(bill =>
        bill.employeeName && this.selectedEmployee && bill.employeeName.toLowerCase().includes(this.selectedEmployee.toLowerCase())
      );
    }
  
    this.groupBillsByBillId(filteredBills);
  }

  filterByDate(): void {
    let filteredBills = this.cashBills;

    if (this.selectedYear) {
      filteredBills = filteredBills.filter(bill =>
        new Date(bill.dateTime).getFullYear() === this.selectedYear
      );
    }

    if (this.selectedMonth !== null) {
      filteredBills = filteredBills.filter(bill =>
        new Date(bill.dateTime).getMonth() === this.selectedMonth
      );
    }

    if (this.selectedDate.value) {
      const formattedDate = formatDate(this.selectedDate.value, 'dd/MM/yyyy', 'en-US');
      filteredBills = filteredBills.filter(bill =>
        formatDate(bill.dateTime, 'dd/MM/yyyy', 'en-US') === formattedDate
      );
    }

    this.groupBillsByBillId(filteredBills);
  }

  getTotalPrice(): number {
    const visibleBills = Object.values(this.groupedBills).flat();
    return visibleBills.reduce((total, bill) => total + (bill.itemCostOut || 0), 0);
  }

  generateYears(): void {
    const allYears = this.cashBills
      .map(bill => new Date(bill.dateTime))
      .filter(date => !isNaN(date.getTime()))
      .map(date => date.getFullYear());
    this.years = Array.from(new Set(allYears)).sort();
  }

  getNumberOfBills(): number {
    return Object.keys(this.groupedBills).length;
  }
  loadEmployeeNames(): void {
    this.employeeService.getAllEmployees$().subscribe((employees: EmployeeDTO[]) => {
      this.employeeNames = employees.reduce((acc, employee) => {
        if (employee.user.name) {
          acc[employee.user.name] = employee.user.name;  // Make sure the employee name exists
        }
        return acc;
      }, {} as { [key: string]: string });  // Type hint here
    });
  }
  
  onOptionSelectedEmployee(event: any): void {
    this.selectedEmployee = event.option.value;
    this.filterData();  // Reapply the filter when an employee is selected
  }

  clearEmployeeFilter(): void {
    this.selectedEmployee = null;
    this.EmployeeController.setValue(null); // Clear the input field
    this.filterData();  // Reapply the filter without employee
  }

  getTotalCostIn(): number {
    const visibleBills = Object.values(this.groupedBills).flat();
    return visibleBills.reduce((total, bill) => total + (bill.itemCostIn || 0), 0);
  }
  
  getTotalProfit(): number {
    const visibleBills = Object.values(this.groupedBills).flat();
    return visibleBills.reduce((total, bill) => total + ((bill.itemCostOut || 0) - (bill.itemCostIn || 0)), 0);
  }
  
  calculateProfit(bill: HistoryOfCashBill): number {
    return (bill.itemCostOut || 0) - (bill.itemCostIn || 0);
  }
  // cash-bill-history.component.ts

printBill(bills: HistoryOfCashBill[]): void {
  if (!bills || bills.length === 0) return;

  const billData = {
    date: new Date(bills[0].dateTime).toLocaleDateString(),
    time: new Date(bills[0].dateTime).toLocaleTimeString(),
    employee: bills[0].employeeName,
    client: bills[0].clientName,
    items: this.aggregateItems(bills),
    totalPrice: bills[0].requierdPrice,
    totalQuantity: this.calculateTotalQuantity(bills),
    discount: this.calculateDiscount(bills),
    moneyReceived: bills[0].clientCashPayed,
    moneyToGive: bills[0].clientRecived,
    debt: ''
  };

  this.openPrintWindow(billData);
}

 
 
 
private aggregateItems(bills: HistoryOfCashBill[]): any[] {
  const itemsMap = new Map<string, { name: string, price: number, quantity: number }>();
  bills.forEach(bill => {
    const key = bill.itemName || '';
    const existing = itemsMap.get(key);
    if (existing) {
      existing.quantity++;
    } else {
      itemsMap.set(key, {
        name: bill.itemName || '',
        price: bill.itemCostOut || 0,
        quantity: 1
      });
    }
  });
  return Array.from(itemsMap.values());
}

private calculateTotalQuantity(bills: HistoryOfCashBill[]): number {
  return bills.length; // Or sum quantities if available
}

private calculateDiscount(bills: HistoryOfCashBill[]): number {
  const totalWithoutDiscount = bills.reduce((sum, b) => sum + (b.itemCostOut || 0), 0);
  return totalWithoutDiscount - (bills[0].requierdPrice || 0);
}

openPrintWindow(billData: any): void {
  const qrMohammad = 'https://wa.me/qr/E4HEDWTXCX22E1';
  const qrJawdat = 'https://wa.me/qr/XH7XYX45R7CUC1';

  const qrMohammadImage = `https://api.qrserver.com/v1/create-qr-code/?size=112x112&data=${encodeURIComponent(qrMohammad)}`;
  const qrJawdatImage = `https://api.qrserver.com/v1/create-qr-code/?size=112x112&data=${encodeURIComponent(qrJawdat)}`;
  const logoImage = '/assets/images/blackwhitelogo.png'; // Use relative path

  const printContent = `
    <div style="text-align: center; font-size: 75%;">
      <h1>VAPE HUB Jericho</h1>
      <img src="${logoImage}" alt="Vape Hub Logo" style="width: 100px; height: auto; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p>Date: ${billData.date}</p>
          <p>Time: ${billData.time}</p>
        </div>
        <div>
          <p>Employee: ${billData.employee}</p>
          <p>Client: ${billData.client}</p>
        </div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 6px;">Item</th>
            <th style="border: 1px solid black; padding: 6px;">Price</th>
            <th style="border: 1px solid black; padding: 6px;">QTY</th>
            <th style="border: 1px solid black; padding: 6px;">TPrice</th>
          </tr>
        </thead>
        <tbody>
          ${billData.items.map((item: any) => `
            <tr>
              <td style="border: 1px solid black; padding: 6px;">${item.name}</td>
              <td style="border: 1px solid black; padding: 6px;">${item.price}</td>
              <td style="border: 1px solid black; padding: 6px;">${item.quantity}</td>
              <td style="border: 1px solid black; padding: 6px;">${item.price*item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="display: flex; justify-content: space-between; margin-top: 15px;">
        <div>
          <p>Total QTY: ${billData.totalQuantity}</p>
          <p>Received: ${billData.moneyReceived}₪</p>
          <p>Residual: ${billData.moneyToGive}₪</p>
          <p>Debt: ${billData.debt}</p>
        </div>
        <div>
          <p>Total Price: ${billData.totalPrice}₪</p>
          <p>Discount: ${billData.discount}₪</p>
          <p>Final Price: ${this.totalCostWithDiscount}₪</p>


        </div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 15px;">
        <div>
          <p>Mohammad</p>
          <img style="width:45px;height:45px;" src="${qrJawdatImage}" alt="QR for Jawdat">
          <p>0598 735 335</p>
        </div>
        <div>
          <p>Jawdat</p>
          <img style="width:45px;height:45px;" src="${qrMohammadImage}" alt="QR for Mohammad">
          <p>0599 486 686</p>
        </div>
      </div>
    </div>
  `;

  const printWindow = window.open('', '_blank', 'width=600,height=600');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }
            th, td {
              padding: 6px;
              text-align: left;
            }
            img {
              display: block;
              margin: 0 auto;
            }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
}
