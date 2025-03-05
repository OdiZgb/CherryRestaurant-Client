import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeAttendanceDTO } from '../DTOs/EmployeeAttendanceDTO';
import { AttendanceSummaryDTO } from '../DTOs/AttendanceSummaryDTO';
import { CheckInStatusDTO } from '../DTOs/EmployeeAttendanceDTO copy';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  private apiURL ='https://localhost:7260/api/attendance';  // Update with your backend URL

  constructor(private http: HttpClient) {}
  // Add to your existing employee service
getCurrentStatus(employeeId: number): Observable<'checked-in' | 'checked-out'> {
  return this.http.get<any>(`${this.apiURL}/attendance/status/${employeeId}`);
}

checkIn(employeeId: number): Observable<any> {
  return this.http.post(`${this.apiURL}/checkin`, { employeeId });
}

checkOut(employeeId: number): Observable<any> {
  return this.http.post(`${this.apiURL}/checkout`, { employeeId });
}

getAttendanceHistory(
  employeeId: number,
  startDate?: Date,
  endDate?: Date
): Observable<EmployeeAttendanceDTO[]> {
  let params: any = { employeeId: employeeId.toString() };
  
  if (startDate) params.startDate = startDate.toISOString();
  if (endDate) params.endDate = endDate.toISOString();

  return this.http.get<EmployeeAttendanceDTO[]>(
    `${this.apiURL}`, 
    { params }
  );
}
getSummary(employeeId: number): Observable<AttendanceSummaryDTO> {
  return this.http.get<AttendanceSummaryDTO>(`${this.apiURL}/summary`, {
    params: { employeeId: employeeId.toString() }
  });
}
getCheckInStatus(employeeId: number): Observable<CheckInStatusDTO> {
  return this.http.get<CheckInStatusDTO>(`${this.apiURL}/status/${employeeId}`);
}
}
