package SDM.utils;

public class StoreItemInfo {
    private int id;
    private String name;
    private String sellBy;
    private float pricePerUnit;
    private int amountSold;

    public StoreItemInfo(int id, String name, String sellBy, float pricePerUnit, int amountSold) {
        this.id = id;
        this.name = name;
        this.sellBy = sellBy;
        this.pricePerUnit = pricePerUnit;
        this.amountSold = amountSold;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSellBy() {
        return sellBy;
    }

    public void setSellBy(String sellBy) {
        this.sellBy = sellBy;
    }

    public float getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(float pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public int getAmountSold() {
        return amountSold;
    }

    public void setAmountSold(int amountSold) {
        this.amountSold = amountSold;
    }
}
