package logicSDM.AllZonesManager;

import logicSDM.StoreManager.StoreManager;
//import users.SingelUserEntry;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class AllZonesManager {

    private HashMap<String, StoreManager> storeManagersByZones;

    public AllZonesManager() {
        this.storeManagersByZones = new HashMap<String, StoreManager>();
    }

    public synchronized void addZone(StoreManager zoneToManage) {
        storeManagersByZones.put(zoneToManage.getZoneName(), zoneToManage);
    }

    public synchronized Map<String,StoreManager> getAllZones() {
        return Collections.unmodifiableMap(storeManagersByZones);
    }
    public StoreManager getStoreMangerForZone(String zoneName){
        return storeManagersByZones.get(zoneName);
    }

}
