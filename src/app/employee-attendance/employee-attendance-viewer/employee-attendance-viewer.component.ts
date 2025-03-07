import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { MessageService } from 'primeng/api';

import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { AttendanceSummaryDTO } from 'src/app/DTOs/AttendanceSummaryDTO';
import { EmployeeAttendanceDTO } from 'src/app/DTOs/EmployeeAttendanceDTO';
import { CheckInStatusDTO } from 'src/app/DTOs/EmployeeAttendanceDTO copy';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';

@Component({
  selector: 'app-employee-attendance-viewer',
  templateUrl: './employee-attendance-viewer.component.html',
  styleUrls: ['./employee-attendance-viewer.component.scss']
})
export class EmployeeAttendanceViewerComponent implements OnInit {
  attendanceHistory: EmployeeAttendanceDTO[] = [];
  summary: AttendanceSummaryDTO | null = null;
  employeeId = parseInt(localStorage.getItem('employeeId') || '0', 10);
  employeeNames: Map<number, string> = new Map<number, string>();
   EmployeeController = new FormControl('');
  constEmployeeNames: Map<number, string> = new Map<number, string>();
  employeeDTOs: EmployeeDTO[] = [];
  isFoundEmployee: boolean = false;
  foundEmployeeId: number = -1;
   foundEmployee!: EmployeeDTO;
  myForm!: FormGroup;

  // Form controls
  filterDate = new FormControl(null);
  filterMonth = new FormControl(null);
  filterYear = new FormControl(null);
  
  // Status variables
  checkInStatus: CheckInStatusDTO | null = null;
  isCheckingIn = false;

  // Dropdown options
  months = Array.from({length: 12}, (_, i) => ({
    label: new Date(0, i).toLocaleString('en', {month: 'long'}),
    value: i + 1
  }));

  years = Array.from({length: 10}, (_, i) => ({
    label: (new Date().getFullYear() - i).toString(),
    value: new Date().getFullYear() - i
  }));

  constructor(
    public mainService: MainSeviceService,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private mainsService: MainSeviceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
        this.myForm = this.formBuilder.group({
          employeeName: this.EmployeeController,
          employeeSalary: ['', [Validators.required, Validators.minLength(1)]],
        });
    this.loadAllData();
    this.mainsService.employeeService.getAllEmployees$().subscribe(x => {
      this.employeeDTOs = x;
      x.forEach(employee => {
        if (employee.id !== null && employee.user.name !== null) {
          this.employeeNames.set(employee.id, employee.user.name);
          this.constEmployeeNames.set(employee.id, employee.user.name);
        }
      });
    });
    this.EmployeeController.valueChanges.subscribe(x => {
      let foundEmployeeByName = this.employeeDTOs.find(s => s.user.name == x);
    
      if (foundEmployeeByName != null && foundEmployeeByName.id != null) {
        this.isFoundEmployee = true;
        this.foundEmployeeId = foundEmployeeByName.id;
        this.employeeId = this.foundEmployeeId;
        this.loadAllData()
      } else if (x == null || x == '') {
        this.employeeNames = new Map(this.constEmployeeNames);
        return;
      }
    
      this.fiterDataEmployee(x);
    });
  }
  onOptionSelectedEmployee(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueEmployee(selectedValue);
  
    if (selectedKey !== undefined) {
      this.isFoundEmployee = true;
      this.foundEmployeeId = selectedKey;
      this.employeeId = selectedKey; // Ensure employeeId is updated
      this.loadAllData(); // Reload attendance data
    }
  }
  
    getKeyFromValueEmployee(value: string): number | undefined {
    const entry = Array.from(this.employeeNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  private loadAllData(): void {
    if (!this.employeeId || this.employeeId === 0) {
      console.warn("Invalid employeeId. Skipping API calls.");
      return;
    }
  
    this.loadCheckInStatus();
    this.loadSummary();
    this.loadAttendanceHistory();
  }
  private loadCheckInStatus(): void {
    this.mainService.attendanceService.getCheckInStatus(this.employeeId).subscribe({
      next: (status) => this.checkInStatus = status,
      error: () => this.showError('Failed to load check-in status')
    });
  }

  private loadSummary(): void {
    this.mainService.attendanceService.getSummary(this.employeeId).subscribe({
      next: (summary) => this.summary = summary,
      error: () => this.showError('Failed to load summary')
    });
  }

  loadAttendanceHistory(): void {
    if (!this.employeeId || this.employeeId === 0) {
      console.warn("Invalid employeeId. Cannot load attendance history.");
      return;
    }
  
    const params: any = { employeeId: this.employeeId.toString() };
  
    if (this.filterYear.value) {
      params.startDate = new Date(this.filterYear.value, 0, 1).toISOString();
      params.endDate = new Date(this.filterYear.value + 1, 0, 1).toISOString();
    }
  
    if (this.filterMonth.value && this.filterYear.value) {
      params.startDate = new Date(this.filterYear.value, this.filterMonth.value - 1, 1).toISOString();
      params.endDate = new Date(this.filterYear.value, this.filterMonth.value, 1).toISOString();
    }
  
    if (this.filterDate.value) {
      const date = new Date(this.filterDate.value);
      params.startDate = date.toISOString();
      params.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString();
    }
  
    this.mainService.attendanceService.getAttendanceHistory(
      this.employeeId,
      params.startDate ?? null, // Avoid sending undefined
      params.endDate ?? null // Avoid sending undefined
    ).subscribe({
      next: (history) => this.attendanceHistory = history,
      error: (err) => {
        console.error("Failed to load attendance history:", err);
        this.showError('Failed to load attendance history');
      }
    });
  }
  

  checkIn(): void {
    if (!this.employeeId || this.isCheckingIn) return;
    
    this.isCheckingIn = true;
    this.mainService.attendanceService.checkIn(this.employeeId).subscribe({
      next: () => {
        this.handleSuccess('Checked in successfully');
        this.loadAllData();
      },
      error: (err) => {
        this.handleError(err);
        this.loadCheckInStatus();
      },
      complete: () => this.isCheckingIn = false
    });
  }

  checkOut(): void {
    if (!this.employeeId) return;

    this.mainService.attendanceService.checkOut(this.employeeId).subscribe({
      next: () => {
        this.handleSuccess('Checked out successfully');
        this.loadAllData();
      },
      error: (err) => this.handleError(err)
    });
  }

  formatDuration(checkInTime: string, checkOutTime: string | null): string {
    if (!checkOutTime) return '-'; // If user hasn't checked out yet
  
    const checkIn = new Date(checkInTime);
    const checkOut = new Date(checkOutTime);
    const diffMs = checkOut.getTime() - checkIn.getTime(); // Difference in milliseconds
  
    if (diffMs <= 0) return '-'; // Invalid data scenario
  
    const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert ms to hours
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining ms to minutes
  
    return `${hours}h ${minutes}m`;
  }
  
  private handleSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }

  private handleError(err: any): void {
    const message = err.error?.message || 'Operation failed';
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  }
  fiterDataEmployee(x: string | null): void {
    if (x == null || x == '') {
      this.employeeNames = new Map(this.constEmployeeNames);
      return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.employeeNames?.forEach((val, k) => {
      if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
        Names.set(k, val);
      }
    });
    this.employeeNames = Names;
  }
}