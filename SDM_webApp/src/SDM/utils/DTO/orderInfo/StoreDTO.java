package SDM.utils.DTO.orderInfo;

import java.util.ArrayList;

public class StoreDTO {

    private ArrayList<ItemDTO> items;
    private String name;
    private int id;
    private float ppk;
    private float distance;
    private float shippingCost;

    public StoreDTO(ArrayList<ItemDTO> items, String name, int id, float ppk, float distance, float shippingCost) {
        this.items = items;
        this.name = name;
        this.id = id;
        this.ppk = ppk;
        this.distance = distance;
        this.shippingCost = shippingCost;
    }

}
