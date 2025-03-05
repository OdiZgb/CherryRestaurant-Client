import { ClientDTO } from "./ClientDTO";
import { ClientDebtDTO } from "./ClientDebtDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";

export class EmployeeAttendanceDTO {
    id: number;
    employeeId: number;
    checkInTime: Date;
    checkOutTime?: Date | null;

    constructor(id: number, employeeId: number, checkInTime: Date, checkOutTime?: Date | null) {
        this.id = id;
        this.employeeId = employeeId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime ?? null;
    }

    get duration(): string | null {
        if (this.checkOutTime) {
            const durationMs = this.checkOutTime.getTime() - this.checkInTime.getTime();
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
            return `${hours}h ${minutes}m`;
        }
        return null;
    }
}
