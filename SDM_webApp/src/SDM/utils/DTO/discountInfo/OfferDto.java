package SDM.utils.DTO.discountInfo;

import logicSDM.Store.Discount.Offer;

public class OfferDto {
    private String itemName;
    private int id;
    private float forAdditional;
    private float amount;

    public OfferDto(Offer offer, String itemName){
        this.itemName = itemName;
        this.id = offer.getItemId();
        this.amount = offer.getQuantity();
        this.forAdditional = offer.getForAdditional();
    }
}
