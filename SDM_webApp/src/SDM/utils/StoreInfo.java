package SDM.utils;

/**
 * dto class for transfering the information about the stores
 * to the combo box in the main page
 */
public class StoreInfo {
    private String storeName;
    private int storeId;
    private String storeOwnerName;
    private int x;
    private int y;
    private int numberOfOrderMade;
    private float paymentForItems;
    private int PPK;
    private float paymentForShipments;

    /**
     * constractor for the ZoneStoresDataServlet
     * @param storeName
     * @param storeId
     * @param storeOwnerName
     * @param x
     * @param y
     * @param numberOfOrderMade
     * @param PPK
     * @param paymentForShipments
     */
    public StoreInfo(String storeName, int storeId, String storeOwnerName, int x, int y, int numberOfOrderMade, int PPK, float paymentForShipments, float totalPayment) {
        this.storeName = storeName;
        this.storeId = storeId;
        this.storeOwnerName = storeOwnerName;
        this.x = x;
        this.y = y;
        this.numberOfOrderMade = numberOfOrderMade;
        this.PPK = PPK;
        this.paymentForShipments = paymentForShipments;
        this.paymentForItems = totalPayment - paymentForShipments;
    }

    /**
     * constroctor used in the storeInfoServlet
     * @param storeName
     * @param storeId
     */
    public StoreInfo(String storeName, int storeId) {
        this.storeName = storeName;
        this.storeId = storeId;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
}
