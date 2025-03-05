import { ClientDTO } from "./ClientDTO";
import { ClientDebtDTO } from "./ClientDebtDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";

export interface CheckInStatusDTO {
    isCheckedIn: boolean;
    lastCheckInTime?: string; // Using string to represent DateTime from the backend
  }