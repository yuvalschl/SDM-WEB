package SDM.utils.DTO.OrderHistory;

import logicSDM.Order.Order;
import logicSDM.Order.StoreOrder;

import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
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
    private String clientName;
    private Map<Integer, OrderItemDto> orderItems = new HashMap<>();


    /**
     * the constructor is for a client order history
     * @param order the order to convert to dto
     */
    public OrderDto(Order order){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
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

    public OrderDto(StoreOrder order){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        this.orderId = order.getOrderId();
        this.orderDate = order.getDateOfOrder();
        this.orderDestination = order.getLocation();
        this.amountOfItems = order.getAmountOfItems();
        this.itemsCost = order.getTotalPriceOfItems();
        this.shippingCost = order.getShippingCost();
        this.totalCost = order.getTotalCost();
        this.clientName = order.getCustomerName();
        order.getItems().forEach(item -> orderItems.put(item.getItemId(), new OrderItemDto(item)));
    }
}
