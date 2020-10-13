package SDM.utils.DTO.orderInfo;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class OrderDTO {

    private ArrayList<StoreDTO> allStores;
    private float orderTotal;
     private float shippingTotal;
      private  float totalItemCost;

    public OrderDTO(ArrayList<StoreDTO> allStores, float orderTotal, float shippingTotal, float totalItemCost) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.allStores = allStores;
        this.orderTotal = Float.parseFloat(decimalFormat.format(orderTotal)) ;
        this.shippingTotal = Float.parseFloat(decimalFormat.format(shippingTotal)) ;
        this.totalItemCost = Float.parseFloat(decimalFormat.format(totalItemCost)) ;
    }

}
