package SDM.utils.DTO.discountInfo;

import logicSDM.Store.Discount.Offer;

import java.util.ArrayList;

public class ThenYouGetDto {
    private String operator;
    private ArrayList<OfferDto> allOffers;

    public ThenYouGetDto(String operator, ArrayList<OfferDto> allOffers) {
        this.operator = operator;
        this.allOffers = allOffers;
    }

}
