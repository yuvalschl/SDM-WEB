package logicSDM.AllZonesManager;

import logicSDM.StoreManager.StoreManager;
import users.SingelUserEntry;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class AllZonesManager {
    private HashMap<Integer, StoreManager> storeManagersByZones;
    private static int zoneID =0;

    synchronized public void AllZonesManager(){
        storeManagersByZones = new HashMap<>();
    }

    public synchronized void addZone(StoreManager zoneToManage) {
        storeManagersByZones.put(++zoneID, zoneToManage);
    }


    public synchronized Map<Integer,StoreManager> getUsers() {
        return Collections.unmodifiableMap(storeManagersByZones);
    }

}
