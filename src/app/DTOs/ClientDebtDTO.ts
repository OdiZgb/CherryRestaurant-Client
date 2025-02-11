import { BillDTO } from "./BillDTO";
import { ClientDTO } from "./ClientDTO";
import { EmployeeDTO } from "./EmployeeDTO";

export interface ClientDebtDTO {
    id: number;
    billId: number | null;
    clientId: string;
    employeeId: string;
    debtValue: number;
    debtPayed: number;
    debtFree: boolean;
    debtDate: string;
    debtFreeDate: string;
    paiedTime: string;
    employee: EmployeeDTO;
    client: ClientDTO;
    bill: BillDTO;
}