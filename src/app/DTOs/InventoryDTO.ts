import { EmployeeDTO } from "./EmployeeDTO";
import { ItemDTO } from "./ItemDTO";
import { PriceInDTO } from "./PriceInDTO";
import { TraderDTO } from "./TraderDTO";
 
export interface InventoryDTO {
    id: number;
    itemId: number;
    patchId: number | null;
    barcode: string | null;
    numberOfUnits: number | null;
    priceInId: number | null;
    traderId: number | null;
    employeeId: number | null;
    itemDTO: ItemDTO | null;
    priceInDTO: PriceInDTO | null;
    arrivalDate: Date;
    manufacturingDate: Date;
    expirationDate: Date;
    traderDTO: TraderDTO | null;
    employee: EmployeeDTO | null;
    imagePath: string| null
}