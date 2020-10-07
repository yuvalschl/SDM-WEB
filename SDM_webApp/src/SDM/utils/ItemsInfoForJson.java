package SDM.utils;

import logicSDM.Item.Item;
import logicSDM.StoreManager.StoreManager;

public class ItemsInfoForJson {
    private int itemID;
    private String itemName;
    private String sellBy;
    private int  amountOfStoresSelling;
    private float averagePrice;
    private float numberOfTimesItemWasSold;

    public ItemsInfoForJson(Item item, StoreManager storeManager) {
        this.itemID = item.getId();
        this.itemName = item.getName();
        this.sellBy = item.getSellBy().toString();
        this.amountOfStoresSelling = storeManager.NumberOfStoresSellingItem(item);
        this.averagePrice = storeManager.getAveragePrice(item);
        this.numberOfTimesItemWasSold = item.getAmountSold();
    }

}
