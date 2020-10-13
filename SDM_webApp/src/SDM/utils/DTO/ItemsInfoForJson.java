package SDM.utils.DTO;

import logicSDM.Item.Item;
import logicSDM.StoreManager.StoreManager;

import java.text.DecimalFormat;

public class ItemsInfoForJson {

    private int itemID;
    private String itemName;
    private String sellBy;
    private int  amountOfStoresSelling;
    private float averagePrice;
    private float numberOfTimesItemWasSold;
    private String isOwner;
    private String userName;

    public ItemsInfoForJson(Item item, StoreManager storeManager, String isOwner, String userName) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");

        this.itemID = item.getId();
        this.itemName = item.getName();
        this.sellBy = item.getSellBy().toString();
        this.amountOfStoresSelling = storeManager.NumberOfStoresSellingItem(item);
        this.averagePrice = Float.parseFloat(decimalFormat.format(storeManager.getAveragePrice(item)));
        this.numberOfTimesItemWasSold = item.getAmountSold();
        this.isOwner = isOwner;
        this.userName = userName;
    }

}
