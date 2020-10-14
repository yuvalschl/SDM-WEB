package SDM.utils.DTO.OrderHistory;

import logicSDM.Order.Order;

import java.util.Map;

public class OrderHistoryDto {
    private Map<Integer, OrderDto> allOrders;

    public OrderHistoryDto(Map<Integer, Order> order) {
        order.forEach((orderId, currentOrder) -> allOrders.put(orderId, new OrderDto(currentOrder)));
    }
}
