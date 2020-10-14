package SDM.utils.DTO.OrderHistory;

import logicSDM.Order.Order;

import java.awt.*;
import java.util.Date;
import java.util.Map;

public class OrderDto {
    private int orderId;
    private Date orderDate;
    private Point orderDestination;
    private int numberOfStoresInOrder;
    private int amountOfItems;
    private float itemsCost;
    private float shippingCost;
    private float totalCost;
    private Map<Integer, OrderItemDto> orderItems;

    public OrderDto(Order order){
        this.orderId = order.getOrderId();
        this.orderDate = order.getDateOfOrder();
        this.orderDestination = order.getCustomerLocation();
        this.numberOfStoresInOrder = order.getStoreIdAndName().size();
        this.amountOfItems = order.getAmountOfItems();
        this.itemsCost = order.getTotalPriceOfItems();
        this.shippingCost = order.getShippingCost();
        this.totalCost = order.getTotalCost();
        order.getItemAmountAndStores().forEach((itemId, item) -> orderItems.put(itemId, new OrderItemDto(item)));
    }
}
