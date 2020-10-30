package logicSDM.Jaxb;

import logicSDM.Exceptions.*;
import logicSDM.Item.Item;
import logicSDM.Item.sellBy;
import logicSDM.Store.*;
import logicSDM.Store.Discount.Discount;
import logicSDM.Store.Discount.MyIfYouBuy;
import logicSDM.Store.Discount.MyThenYouGet;
import logicSDM.Store.Discount.Offer;
import logicSDM.StoreManager.StoreManager;
import logicSDM.Jaxb.jaxbClasses.*;
import javafx.beans.property.BooleanProperty;
import users.Owner;

import java.awt.*;
import java.io.File;
import java.util.*;
import java.util.List;

public class JaxbClassToStoreManager {
    private File file;
    private BooleanProperty xmlLoaded;
    private StoreManager storeManager;


/*    public JaxbClassToStoreManager(StoreManager storeManager, File file){
        this.file = file;
        //this.xmlLoaded = xmlLoaded;
        this.storeManager = storeManager;
    }*/

    //TODO: do all the new testing
    public StoreManager convertJaxbClassToStoreManager(SuperDuperMarketDescriptor xmlStore, Owner owner) throws Exception {
        try{
            Map<Integer, Item> allItems = createAllItemsMap(xmlStore.getSDMItems().getSDMItem());
            Map<Integer, Store> allStores = createAllStoresMap(xmlStore.getSDMStores().getSDMStore(), allItems, owner, xmlStore.getSDMZone().getName());
            HashSet<Integer> notSoldItems = checkIfAllTheItemsFromTheFileAreSold(allItems);
            String zoneName = xmlStore.getSDMZone().getName();
            if(!notSoldItems.isEmpty()){
                throw new ItemNotSoldException("Items with id: " + notSoldItems.toString() + " are not sold by any store");
            }
            return new StoreManager(allStores, allItems, zoneName, owner);
        }
        catch (Exception e){

            throw new Exception(e.getMessage());
        }
    }



    private Map<Integer, Item> createAllItemsMap(List<SDMItem> sdmItems) throws DuplicateValueException {
        Map<Integer, Item> allItems = new HashMap<Integer, Item>();
        for(SDMItem item : sdmItems){
            if(allItems.containsKey(item.getId())){
                throw new DuplicateValueException("logicSDM.Item with id: " + item.getId() + " already exists in the system");
            }
            sellBy sellBy = item.getPurchaseCategory().equals("Quantity") ? logicSDM.Item.sellBy.UNIT : logicSDM.Item.sellBy.WEIGHT;
            allItems.put(item.getId(), new Item(item.getId(), item.getName(), sellBy));
        }

        return allItems;
    }

    private Map<Integer, Store> createAllStoresMap(List<SDMStore> sdmStores, Map<Integer, Item> allItems, Owner owner, String zoneName) throws DuplicateValueException, InvalidValueException {
        Map<Integer, Store> allStores = new HashMap<Integer, Store>();
        for(SDMStore store : sdmStores){
            if(allStores.containsKey(store.getId())){
                throw new DuplicateValueException("logicSDM.Store with id: " + store.getId() + " already exists in the system");
            }
            Map<Integer, Item> currentStoreInventory = createCurrentStoreInventory(allItems, store, allItems);
            Set<Discount> currentStoreDiscount = new HashSet<Discount>();
            if(store.getSDMDiscounts() != null){
                currentStoreDiscount = createCurrentStoreDiscount(store.getSDMDiscounts().getSDMDiscount(), currentStoreInventory, store.getName());
            }
            Point currentStoreLocation = new Point(store.getLocation().getX(), store.getLocation().getY());
            if(!isLocationValid(currentStoreLocation)){
                throw new InvalidValueException(store.getId() + "has invalid location");
            }
            Store currentStore = new Store(store.getName(), store.getId(), currentStoreInventory, null, currentStoreLocation, store.getDeliveryPpk(),currentStoreDiscount, owner, zoneName);
            allStores.put(store.getId(), currentStore);
        }
        owner.getAllZones().put(zoneName, allStores);
        return allStores;
    }

    private Set<Discount> createCurrentStoreDiscount(List<SDMDiscount> allDiscounts, Map<Integer, Item> currentStoreInventory, String storeName) throws InvalidValueException {
        Set<Discount> currentStoreDiscounts = new HashSet<Discount>();
        for(SDMDiscount sdmDiscount : allDiscounts){
            MyIfYouBuy myIfYouBuy = new MyIfYouBuy(sdmDiscount.getIfYouBuy().getItemId(), (float) sdmDiscount.getIfYouBuy().getQuantity());
            MyThenYouGet thenYouGet;
            if(currentStoreInventory.containsKey(myIfYouBuy.getItemId())){
                thenYouGet = createThenYouGet(sdmDiscount.getThenYouGet());
                for(Offer offer : thenYouGet.getAllOffers()){
                    if(!currentStoreInventory.containsKey(offer.getItemId())){
                        throw new InvalidValueException(storeName + " dose not sell item with id: " + offer.getItemId());
                    }
                }
            }
            else {
                throw new InvalidValueException(storeName + " dose not sell item with id: " + myIfYouBuy.getItemId());
            }
            currentStoreDiscounts.add(new Discount(sdmDiscount.getName(), myIfYouBuy, thenYouGet));
        }

        return currentStoreDiscounts;
    }

    private MyThenYouGet createThenYouGet(ThenYouGet thenYouGet) {
        Set<Offer> allOffers = new HashSet<Offer>();
        for(SDMOffer sdmOffer : thenYouGet.getSDMOffer()){
            allOffers.add(new Offer(sdmOffer.getItemId(), (int) sdmOffer.getQuantity(), sdmOffer.getForAdditional()));
        }
        return new MyThenYouGet(MyThenYouGet.getOperatorFromSdmOffer(thenYouGet.getOperator()), allOffers);

    }

    private Map<Integer, Item> createCurrentStoreInventory(Map<Integer, Item> allItemsFromFile, SDMStore currentStore, Map<Integer, Item> allItemsInSystem) throws InvalidValueException {
        List<SDMSell> sdmSellList = currentStore.getSDMPrices().getSDMSell();
        Map<Integer, Item> currentInventory = new HashMap<Integer, Item>();
        for(SDMSell item : sdmSellList){
            if(!allItemsFromFile.containsKey(item.getItemId())){
                throw new InvalidValueException("logicSDM.Item with id: " + item.getItemId() + " dose not exists in the system and cannot be sold by store with id: " + currentStore.getId());
            }
            if(currentInventory.containsKey(item.getItemId())){
                throw new InvalidValueException("logicSDM.Store.logicSDM.Store with id: " + currentStore.getId() + " already selling item with id:" + item.getItemId());
            }
            Item itemToAdd = allItemsFromFile.get(item.getItemId());
            if(itemToAdd.getSellBy().equals(sellBy.UNIT)){
                itemToAdd = new Item(itemToAdd, item.getPrice(), sellBy.UNIT);
            }
            else {
                itemToAdd = new Item(itemToAdd, item.getPrice(), sellBy.WEIGHT);
            }
            currentInventory.put(itemToAdd.getId(), itemToAdd);
            allItemsInSystem.get(itemToAdd.getId()).setSold(true);
        }

        return currentInventory;
    }

    private boolean isLocationValid(Point point){
        int x = point.x;
        int y = point.y;
        return x >= 1 && !(x > 50 | y < 0) && y <= 50;
    }

    private HashSet<Integer> checkIfAllTheItemsFromTheFileAreSold( Map<Integer, Item> allItems){
        HashSet<Integer> notSoldItems = new HashSet<>();
        allItems.keySet().stream().filter(key -> !allItems.get(key).getIsSold()).forEach(notSoldItems::add);
        return notSoldItems;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public boolean isXmlLoaded() {
        return xmlLoaded.get();
    }

    public BooleanProperty xmlLoadedProperty() {
        return xmlLoaded;
    }

    public void setXmlLoaded(boolean xmlLoaded) {
        this.xmlLoaded.set(xmlLoaded);
    }


}
