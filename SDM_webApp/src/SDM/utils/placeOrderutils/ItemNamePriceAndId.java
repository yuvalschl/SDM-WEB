package SDM.utils.placeOrderutils;

import java.text.DecimalFormat;

/**
 * this class is built to get the information needed to fill the items table in the place order page
 */
public class ItemNamePriceAndId {
    private String itemName;
    private float price;
    private int itemID;

    public ItemNamePriceAndId(String name, float price, int id) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.itemName = name;
        this.price = Float.parseFloat(decimalFormat.format(price)) ;
        this.itemID = id;
    }

}
