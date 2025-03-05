import { ClientDTO } from "./ClientDTO";
import { ClientDebtDTO } from "./ClientDebtDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";

export class AttendanceSummaryDTO {
    employeeId: number;
    totalHoursToday: string; // Use string to store TimeSpan as ISO 8601 duration format
    totalHoursThisMonth: string; // Same as above
    totalHoursThisYear: string; // Same as above

    constructor(employeeId: number, totalHoursToday: string, totalHoursThisMonth: string, totalHoursThisYear: string) {
        this.employeeId = employeeId;
        this.totalHoursToday = totalHoursToday;
        this.totalHoursThisMonth = totalHoursThisMonth;
        this.totalHoursThisYear = totalHoursThisYear;
    }
}
