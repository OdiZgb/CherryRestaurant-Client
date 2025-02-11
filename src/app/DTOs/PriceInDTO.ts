import { ItemDTO } from "./ItemDTO";

export interface PriceInDTO {
  id: number;
  itemId?: number;
  price: number;
  item?: ItemDTO;
  date: string;
  expirationDate: string;
}