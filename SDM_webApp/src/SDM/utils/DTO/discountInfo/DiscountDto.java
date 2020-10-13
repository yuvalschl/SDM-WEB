package SDM.utils.DTO.discountInfo;

import logicSDM.Store.Discount.Discount;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class DiscountDto {
    private String name;
    private int storeId;
    private IfYouBuyDto ifYouBuy;
    private ThenYouGetDto thenYouGet;


    public DiscountDto(Discount discount, ArrayList<OfferDto> offers, String ifYouBuyName){
        this.name = discount.getName();
        this.storeId = discount.getStoreId();
        this.ifYouBuy = new IfYouBuyDto(discount.getIfYouBuy(), ifYouBuyName);
        this.thenYouGet = new ThenYouGetDto(discount.getThenYouGet().getDiscountOperator().toString(), offers);
    }
}
