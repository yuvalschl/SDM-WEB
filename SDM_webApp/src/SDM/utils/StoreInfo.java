package SDM.utils;

/**
 * dto class for transfering the information about the stores
 * to the combo box in the main page
 */
public class StoreInfo {
    private String storeName;
    private int storeId;

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
