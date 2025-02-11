import { ClientDTO } from "./ClientDTO";
import { ClientDebtDTO } from "./ClientDebtDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";

export interface BillDTO {
    id: number;
    clientId: number;
    employeeId: number;
    clientDebtId: number;
    requierdPrice: number;
    paiedPrice: number;
    exchangeRepaied: number;
    completed: boolean;
    discount: number,
    time: string;
    employee: EmployeeDTO | null;
    client: ClientDTO | null;
    clientDebt: ClientDebtDTO | null;
    items: ItemDTO[];
}