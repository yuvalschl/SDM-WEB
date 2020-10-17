package users;

import logicSDM.Order.StoreOrder;
import logicSDM.Store.Feedback.Feedback;
import logicSDM.Store.Store;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Owner extends SingelUserEntry {
    private ArrayList <StoreOrder> allOrders = new ArrayList<>();
    private Map <String, Map<Integer, Store>> allZones = new HashMap<>();

    public Owner(String name){
        super(name);
        super.setOwner(true);
    }

    public ArrayList <StoreOrder> getAllOrders() {
        return allOrders;
    }

    public void setAllOrders(ArrayList <StoreOrder> allOrders) {
        this.allOrders = allOrders;
    }

    public boolean isOwner(){return true;};

    public Map<String, Map<Integer, Store>> getAllZones() {
        return allZones;
    }

    public void setAllZones(Map<String, Map<Integer, Store>> allZones) {
        this.allZones = allZones;
    }
}
