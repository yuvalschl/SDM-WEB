package SDM.utils.DTO.discountInfo;

import logicSDM.Jaxb.jaxbClasses.IfYouBuy;
import logicSDM.Store.Discount.MyIfYouBuy;

public class IfYouBuyDto {
    private String itemName;
    private int itemId;
    private float amount;

    public IfYouBuyDto(MyIfYouBuy myIfYouBuy, String itemName){
        this.itemName = itemName;
        this.itemId = myIfYouBuy.getItemId();
        this.amount = myIfYouBuy.getQuantity();
    }
}
