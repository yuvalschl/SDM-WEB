package SDM.utils;

import logicSDM.Item.Item;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;

import java.util.HashSet;
import java.util.Map;

public class ZoneInfo {
    String zoneOwner;
    String zoneName;
    int amountOfItemTypes;
    int amountOfStores;
    int amountOfOrders;
    float averagePriceOfOrders;

    public ZoneInfo(StoreManager storeManager){
        zoneOwner = storeManager.getZoneOwner();
        zoneName = storeManager.getZoneName();
        amountOfItemTypes = calcAmountOfItems(storeManager);
        amountOfStores = storeManager.getAllStores().size();
        amountOfOrders = storeManager.getAllOrders().size();
        averagePriceOfOrders = 0;
    }

    private int calcAmountOfItems(StoreManager storeManager){
        int numberOfItems = 0;
        HashSet<Integer> uniqueItems = new HashSet<>();
        Map<Integer, Store> allStores = storeManager.getAllStores();
        for(Store store : allStores.values()){
            for(Item item : store.getInventory().values()){
                if (!uniqueItems.contains(item.getId())){
                    uniqueItems.add(item.getId());
                    numberOfItems++;
                }
            }
        }

        return numberOfItems;
    }
}
