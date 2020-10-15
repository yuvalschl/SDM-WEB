package logicSDM.Store.Discount;

public class Offer {
    private int itemId;
    private int quantity;
    private float forAdditional;

    public Offer(int itemId, int quantity, float forAdditional) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.forAdditional = forAdditional;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getForAdditional() {
        return forAdditional;
    }

    public void setForAdditional(float forAdditional) {
        this.forAdditional = forAdditional;
    }
}
