import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PayLaterDTO } from 'src/app/DTOs/PayLaterDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';

@Component({
  selector: 'app-display-paylaters',
  templateUrl: './display-paylaters.component.html',
  styleUrls: ['./display-paylaters.component.scss']
})
export class DisplayPaylatersComponent implements OnInit {
  payLates: PayLaterDTO[] = [];
  filteredPayLates: PayLaterDTO[] = [];
  years: number[] = [];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  selectedDate: FormControl = new FormControl(null);
  selectedEmployee: string = "";
  employeeNames: { [key: string]: string } = {};
  EmployeeController: FormControl = new FormControl(null);

  constructor(public mainSeviceService: MainSeviceService) {}

  ngOnInit(): void {
    this.loadPayLaters();
    this.generateYears();
  }

  loadPayLaters(): void {
    this.mainSeviceService.employeeService.getAllPayLaters$().subscribe(paylater => {
      this.payLates = paylater;

      this.payLates.forEach(s => {
        this.mainSeviceService.employees.subscribe(e => {
          e.forEach(element => {
            if (element.id === s.employeeId) {
              s.employee = element;
              this.employeeNames[element.id] = element.user.name || "";
            }
          });
        });
      });

      this.filteredPayLates = [...this.payLates]; // Ensure initial filtered data is the same as all data
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  }

  getTotalAmount(): number {
    return this.filteredPayLates.reduce((total, paylater) => total + (paylater.value || 0), 0);
  }

  filterData(): void {
    this.filteredPayLates = this.payLates.filter(pl => {
      const plDate = new Date(pl.date);
      
      return (
        (!this.selectedEmployee || pl.employee?.user.name?.toLowerCase().includes(this.selectedEmployee.toLowerCase())) &&
        (!this.selectedYear || plDate.getFullYear() === this.selectedYear) &&
        (this.selectedMonth === null || plDate.getMonth() === this.selectedMonth) &&
        (!this.selectedDate.value || plDate.getDate() === new Date(this.selectedDate.value).getDate())
      );
    });
  }
}
