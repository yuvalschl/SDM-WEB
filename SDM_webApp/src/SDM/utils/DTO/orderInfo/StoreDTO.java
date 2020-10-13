package SDM.utils.DTO.orderInfo;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class StoreDTO {

    private ArrayList<ItemDTO> items;
    private String name;
    private int id;
    private float ppk;
    private float distance;
    private float shippingCost;

    public StoreDTO(ArrayList<ItemDTO> items, String name, int id, float ppk, float distance, float shippingCost) {
        final DecimalFormat decimalFormat = new DecimalFormat("0.00");
        this.items = items;
        this.name = name;
        this.id = id;
        this.ppk = Float.parseFloat(decimalFormat.format(ppk)) ;
        this.distance =Float.parseFloat(decimalFormat.format(distance)) ;
        this.shippingCost =Float.parseFloat(decimalFormat.format(shippingCost)) ;
    }

}
