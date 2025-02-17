import { EmployeeDTO } from "./EmployeeDTO";

export interface PayLaterDTO {
  id: number;
  employeeId: number;
  note: string;
  value: number;
  date: Date,
  employee: EmployeeDTO;
}
