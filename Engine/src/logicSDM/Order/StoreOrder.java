package logicSDM.Order;

import logicSDM.Item.sellBy;
import logicSDM.ItemPair.ItemAmountAndStore;
import logicSDM.Store.Store;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;

public class StoreOrder {
    private Date dateOfOrder;
    private int amountOfItems;
    private float totalPriceOfItems;
    private float shippingCost;
    private float totalCost;
    private float distance;
    private Store store;
    private int storeID;
    private String storeName;
    private int orderId;
    private ArrayList<ItemAmountAndStore> items;
    private float pkk;
    private Point location;
    private String customerName;

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public StoreOrder(Date dateOfOrder, float shippingCost, float distance, Store store, int orderId, float pkk, Point location, String customerName) {
        this.dateOfOrder = dateOfOrder;
        this.shippingCost = shippingCost;
        this.distance = distance;
        this.store = store;
        this.orderId = orderId;
        this.totalPriceOfItems = 0;
        this.totalCost = shippingCost;
        this.items = new ArrayList<>();
        this.pkk = pkk;
        this.storeName = store.getName();
        this.storeID = store.getSerialNumber();
        this.location = location;
        this.customerName = customerName;
    }

    public void addItemToOrder(ItemAmountAndStore item){
        this.items.add(item);
        float priceToAddToTotalCost;
        float priceToAddToTotalItemCost;
        if (item.getIsPartOfDiscount()){
            priceToAddToTotalCost = item.getItem().getPrice();
            priceToAddToTotalItemCost = item.getItem().getPrice();
        }
        else{
            priceToAddToTotalCost = item.getStore().getInventory().get(item.getItemId()).getPrice() * item.getAmount();
            priceToAddToTotalItemCost = item.getStore().getInventory().get(item.getItemId()).getPrice() * item.getAmount();
        }
        totalCost += priceToAddToTotalCost;
        totalPriceOfItems += priceToAddToTotalItemCost;
        if(item.getItem().getSellBy().equals(sellBy.UNIT)){
            amountOfItems += item.getAmount();
        }
        else {
            amountOfItems += 1;
        }
    }


    public float getPkk() {
        return pkk;
    }

    public void setPkk(float pkk) {
        this.pkk = pkk;
    }

    public int getStoreID() {
        return storeID;
    }

    public void setStoreID(int storeID) {
        this.storeID = storeID;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public int getAmountOfItems() {
        return amountOfItems;
    }

    public void setAmountOfItems(int amountOfItems) {
        this.amountOfItems = amountOfItems;
    }

    public float getTotalPriceOfItems() {
        return totalPriceOfItems;
    }

    public void setTotalPriceOfItems(float totalPriceOfItems) {
        this.totalPriceOfItems = totalPriceOfItems;
    }

    public float getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(float shippingCost) {
        this.shippingCost = shippingCost;
    }

    public float getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(float totalCost) {
        this.totalCost = totalCost;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store stores) {
        this.store = stores;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public ArrayList<ItemAmountAndStore> getItems() {
        return items;
    }

    public void setItems(ArrayList<ItemAmountAndStore> items) {
        this.items = items;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
