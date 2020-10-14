package SDM.utils.DTO.OrderHistory;

import logicSDM.ItemPair.ItemAmountAndStore;

public class OrderItemDto {
    private int itemId;
    private String itemName;
    private String sellBy;
    private int storeId;
    private String storeName;
    private float amount;
    private float pricePerUnit;
    private float totalCost;
    private boolean partOfDiscount;

    public OrderItemDto(ItemAmountAndStore item){
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.sellBy = item.getItem().getSellBy().toString();
        this.storeId = item.getStore().getSerialNumber();
        this.storeName = item.getStore().getName();
        this.amount = item.getAmount();
        this.pricePerUnit = item.getItem().getPrice();
        this.totalCost = amount * pricePerUnit;
        this.partOfDiscount = item.getIsPartOfDiscount();
    }
}
