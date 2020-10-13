package SDM.utils.DTO.orderInfo;

import java.text.DecimalFormat;

public class ItemDTO {
    private String name;
    private int id;
    private float amount;
    private String sellBy;
    private float totalItemCost;
    private String isPartOfSale;

    public ItemDTO(String name, int id, float amount, String sellBy, float totalItemCost, String isPartOfSale) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.name = name;
        this.id = id;
        this.amount = Float.parseFloat(decimalFormat.format(amount)) ;
        this.sellBy = sellBy;
        this.totalItemCost = Float.parseFloat(decimalFormat.format(totalItemCost));
        this.isPartOfSale = isPartOfSale;
    }

}
