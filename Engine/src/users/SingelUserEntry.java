package users;

import logicSDM.balance.Balance;

public abstract class SingelUserEntry {

    private String name;
    private Balance balance;
    private boolean isOwner;
    SingelUserEntry(String name){
        this.name = name;
        balance = new Balance();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Balance getBalance() {
        return balance;
    }

    public void setBalance(Balance balance) {
        this.balance = balance;
    }

    public boolean isOwner() {
        return isOwner;
    }

    public void setOwner(boolean owner) {
        isOwner = owner;
    }

}
