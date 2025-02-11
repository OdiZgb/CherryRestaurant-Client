import { ItemDTO } from "./ItemDTO";
import { PriceInDTO } from "./PriceInDTO";

export interface InventoryDTO {
    id: number;
    itemId: number;
    patchId: number | null;
    numberOfUnits: number | null;
    priceInId: number | null;
    itemDTO: ItemDTO | null;
    priceInDTO: PriceInDTO | null;
    arrivalDate: Date;
    manufacturingDate: Date;
    expirationDate: Date;
}