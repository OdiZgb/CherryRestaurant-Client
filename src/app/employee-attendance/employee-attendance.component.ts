// employee-attendance.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { MessageService } from 'primeng/api';
import { EmployeeAttendanceDTO } from '../DTOs/EmployeeAttendanceDTO';
import { AttendanceSummaryDTO } from '../DTOs/AttendanceSummaryDTO';
import { CheckInStatusDTO } from '../DTOs/EmployeeAttendanceDTO copy';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss']
})
export class EmployeeAttendanceComponent implements OnInit {
  attendanceHistory: EmployeeAttendanceDTO[] = [];
  summary: AttendanceSummaryDTO | null = null;
  employeeId = parseInt(localStorage.getItem('employeeId') || '0', 10);

  // Form controls
  filterDate = new FormControl(null);
  filterMonth = new FormControl(null);
  filterYear = new FormControl(null);
  
  // Status variables
  checkInStatus: CheckInStatusDTO | null = null;
  isCheckingIn = false;

  // Dropdown options
  months = [
    { label: 'يناير', value: 1 },
    { label: 'فبراير', value: 2 },
    { label: 'مارس', value: 3 },
    { label: 'أبريل', value: 4 },
    { label: 'مايو', value: 5 },
    { label: 'يونيو', value: 6 },
    { label: 'يوليو', value: 7 },
    { label: 'أغسطس', value: 8 },
    { label: 'سبتمبر', value: 9 },
    { label: 'أكتوبر', value: 10 },
    { label: 'نوفمبر', value: 11 },
    { label: 'ديسمبر', value: 12 }
  ];
  years = Array.from({length: 10}, (_, i) => ({
    label: (new Date().getFullYear() - i).toString(),
    value: new Date().getFullYear() - i
  }));

  constructor(
    public mainService: MainSeviceService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    if (!this.employeeId) return;

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
    const params: any = {
      employeeId: this.employeeId.toString()
    };
  
    if (this.filterYear.value) {
      params.startDate = new Date(
        this.filterYear.value, 
        0, 
        1
      ).toISOString();
      params.endDate = new Date(
        this.filterYear.value + 1, 
        0, 
        1
      ).toISOString();
    }
  
    if (this.filterMonth.value && this.filterYear.value) {
      params.startDate = new Date(
        this.filterYear.value, 
        this.filterMonth.value - 1, 
        1
      ).toISOString();
      params.endDate = new Date(
        this.filterYear.value, 
        this.filterMonth.value, 
        1
      ).toISOString();
    }
  
    if (this.filterDate.value) {
      const date = new Date(this.filterDate.value);
      params.startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString();
      params.endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      ).toISOString();
    }
  
    this.mainService.attendanceService.getAttendanceHistory(
      this.employeeId,
      params.startDate,
      params.endDate
    ).subscribe({
      next: (history) => this.attendanceHistory = history,
      error: () => this.showError('Failed to load attendance history')
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
}