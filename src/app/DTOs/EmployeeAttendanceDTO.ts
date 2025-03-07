import { ClientDTO } from "./ClientDTO";
import { ClientDebtDTO } from "./ClientDebtDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";

export class EmployeeAttendanceDTO {
    id: number;
    employeeId: number;
    checkInTime: Date;
    checkOutTime?: Date | null;
    duration: string | null | undefined;

    constructor(id: number, employeeId: number, checkInTime: Date, checkOutTime?: Date | null) {
        this.id = id;
        this.employeeId = employeeId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime ?? null;
    }

 
}
