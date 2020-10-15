package users;

import logicSDM.Order.Order;
import java.util.HashMap;
import java.util.Map;

public class Clinet extends  SingelUserEntry {
    Map<Integer, Order> orderHistory;

    public Clinet(String name) {
        super(name);
        orderHistory = new HashMap<>();
        super.setOwner(false);
    }

    public Map<Integer, Order> getOrderHistory() {
        return orderHistory;
    }

    public void setOrderHistory(Map<Integer, Order> orderHistory) {
        this.orderHistory = orderHistory;
    }

    public boolean isOwner(){return false;};
}
