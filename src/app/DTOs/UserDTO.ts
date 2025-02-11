import { EmployeeDTO } from "./EmployeeDTO";

export interface UserDTO {
  id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
  securityLevel: number | null;
  userType: number | null;
  isTrader: boolean;
  isEmployee: boolean;
  isClient: boolean;
  token: string | null;
  employee: EmployeeDTO| null;
}