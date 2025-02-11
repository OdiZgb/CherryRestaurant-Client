
export interface HistoryOfCashBill {
    id: number;
    itemName?: string;
    itemId?: string;
    itemBarcode?: string;
    itemCostIn?: number;
    itemCostOut?: number;
    employeeName?: string;
    employeeId?: number;
    clientName?: string;
    clientId?: number;
    inventoryName?: number;
    inventoryId?: number;
    barcode?: string;
    billId?: number;
    TraderName?: string;
    traderId?: number;
    requierdPrice?: number;
    clientCashPayed?: number;
    clientRecived?: number;
    SoftDeleted?:number;
    dateTime:Date
}