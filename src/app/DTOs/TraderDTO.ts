import { InventoryDTO } from "./InventoryDTO";

export interface TraderDTO {
    id: number | null;
    name: string | null;
    mobileNumber: string | null;
    email: string | null;
    inventories: InventoryDTO[] | null;
}