package SDM.utils.DTO.orderInfo;

import java.util.ArrayList;

public class OrderDTO {

    private ArrayList<StoreDTO> allStores;
    private float orderTotal;
     private float shippingTotal;
      private  float totalItemCost;

    public OrderDTO(ArrayList<StoreDTO> allStores, float orderTotal, float shippingTotal, float totalItemCost) {
        this.allStores = allStores;
        this.orderTotal = orderTotal;
        this.shippingTotal = shippingTotal;
        this.totalItemCost = totalItemCost;
    }

}
