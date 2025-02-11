import { EmployeeDTO } from "./EmployeeDTO";

export interface SalaryDTO {
  id: number;
  employeeId: number;
  value: number;
  employee: EmployeeDTO;
}