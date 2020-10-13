package SDM.utils.DTO.orderAndDiscountWrapper;

import SDM.utils.DTO.discountInfo.DiscountDto;
import SDM.utils.DTO.orderInfo.OrderDTO;

import java.util.ArrayList;

public class OrderAndDiscountWrapperDTO {
    private ArrayList<DiscountDto> discount;
    private OrderDTO order;

    public OrderAndDiscountWrapperDTO(ArrayList<DiscountDto> discount, OrderDTO order) {
        this.discount = discount;
        this.order = order;
    }
}
