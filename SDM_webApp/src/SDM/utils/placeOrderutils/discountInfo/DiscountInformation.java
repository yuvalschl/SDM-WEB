package SDM.utils.placeOrderutils.discountInfo;

import java.text.DecimalFormat;

public class DiscountInformation {
    private String name;
    private String becauseYouBought;
    private int forAddtional;


    public DiscountInformation(String name, String becauseYouBoughtItemName ) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.name = name;
        //this.quantity = quantity;
    }

}
