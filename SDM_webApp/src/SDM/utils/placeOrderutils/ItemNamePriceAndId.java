package SDM.utils.placeOrderutils;

import java.text.DecimalFormat;

/**
 * this class is built to get the information needed to fill the items table in the place order page
 */
public class ItemNamePriceAndId {
    private String name;
    private float pricePerUnit;
    private int id;
    private String sellBy;
    public ItemNamePriceAndId(String name, float price, int id, String sellBy) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.name = name;
        this.pricePerUnit = Float.parseFloat(decimalFormat.format(price)) ;
        this.id = id;
        this.sellBy = sellBy;
    }

}
