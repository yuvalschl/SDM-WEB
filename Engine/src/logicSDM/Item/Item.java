package logicSDM.Item;

import logicSDM.Exceptions.InvalidValueException;

import java.util.Objects;

public class Item {
    private boolean isSold;
    private int id;
    private String name;
    private float price;
    private float amountSold;
    private static int maxID = 0;
    private sellBy sellBy;

    public Item(int id, String name, float price, sellBy sellBy) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountSold = 0;
        this.sellBy = sellBy;
        isSold = false;
        if (id > maxID)
            maxID = id;
    }

    public Item(int id, String name, float price, float amountSold) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountSold = amountSold;
        //isSold = false;
        if (id > maxID)
            maxID = id;
    }

    public Item(Item itemToAdd, int price, sellBy sellBy) {
        this.id = itemToAdd.id;
        this.name = itemToAdd.name;
        this.price = price;
        this.amountSold = itemToAdd.amountSold;
        this.isSold = false;
        this.sellBy = sellBy;
    }

    public int getMaxID() { return maxID; }

    public void setMaxID(int maxID) { this.maxID = maxID; }

    public boolean getIsSold() {
        return isSold;
    }

    public void setSold(boolean sold) {
        isSold = sold;
    }

    public Item(int id, String name, sellBy sellBy) {
        this.id = id;
        this.name = name;
        this.sellBy = sellBy;
    }

    public sellBy getSellBy() {
        return sellBy;
    }

    public void setSellBy(sellBy sellBy) {
        this.sellBy = sellBy;
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

    public float getPrice() {
        return price;
    }



    public void setPrice(float price) throws InvalidValueException {
        if(price > 0){
            this.price = price;
        }
        else {
            throw new InvalidValueException("Price cant be negative");
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return getId() == item.getId() &&
                Float.compare(item.getPrice(), getPrice()) == 0 &&
                getName().equals(item.getName());
    }

    public float getAmountSold(){return this.amountSold;}



    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPrice());
    }

    public void setAmountSold(float amountSold){
        this.amountSold = amountSold;
    };

}
