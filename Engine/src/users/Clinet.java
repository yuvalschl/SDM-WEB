package users;

import logicSDM.Order.Order;
import logicSDM.balance.Balance;

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


    public String getName() {
      return   super.getName();
    }

    public void setName(String name) {
       super.setName(name);
    }

    public Balance getBalance() {

        return super.getBalance();
    }

    public void setBalance(Balance balance) {
       super.setBalance(balance);
    }

}
