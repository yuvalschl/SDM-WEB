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
    private ArrayList<Notification> notifications = new ArrayList<>();
    private int lastNotificationSent = 0;

    public Owner(String name){
        super(name);
        super.setOwner(true);
    }

    public static class Notification{
        private int id;
        private String msg;

        public Notification(String msg, int id) {
            this.id = id;
            this.msg = msg;
        }
    }

    public void addMsg(String msg){
        notifications.add(new Notification(msg, notifications.size()));
    }

    public ArrayList<Notification> getNewNotifications(){
        ArrayList<Notification> notificationsToReturn = new ArrayList<>();
        for(int i = lastNotificationSent ; i < notifications.size() ; i++){
            notificationsToReturn.add(notifications.get(i));
        }

        return notificationsToReturn;
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
