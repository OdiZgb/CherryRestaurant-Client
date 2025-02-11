import { CategoryDTO } from "./CategoryDTO";
import { ItemImageDTO } from "./ItemImageDTO";
import { MarkaDTO } from "./MarkaDTO";
import { PriceInDTO } from "./PriceInDTO";
import { PriceOutDTO } from "./PriceOutDTO";
import { TagDTO } from "./TagDTO";
import { TagItemDTO } from "./TagItemDTO";

export interface ItemDTO {
  id: number;
  name: string;
  barcode: string;
  itemsImageDTOs?: ItemImageDTO[] | null;
  markaDTO?: MarkaDTO,
  categoryDTO?: CategoryDTO,
  priceOutDTO?: PriceOutDTO,
  priceInDTO?: PriceInDTO,
  tagItemDTOs?: TagItemDTO[] | null;  // Add the tags, similar to the backend
  tagDTO?:TagDTO[] | null;
  tagsDTO?:TagDTO[] | null;

}