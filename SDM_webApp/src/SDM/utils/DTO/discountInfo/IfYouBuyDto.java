package SDM.utils.DTO.discountInfo;

import logicSDM.Jaxb.jaxbClasses.IfYouBuy;
import logicSDM.Store.Discount.MyIfYouBuy;

public class IfYouBuyDto {
    private String itemName;
    private int id;
    private float amount;

    public IfYouBuyDto(MyIfYouBuy myIfYouBuy, String itemName){
        this.itemName = itemName;
        this.id = myIfYouBuy.getItemId();
        this.amount = myIfYouBuy.getQuantity();
    }
}
