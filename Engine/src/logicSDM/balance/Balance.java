package logicSDM.balance;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

public class Balance {

    float balance;
    static int numberOfActions;
    HashMap<Integer,BalanceAction> balanceActions;

    public Balance(){
        balance = 0;
        balanceActions = new HashMap<>();
        numberOfActions = 0;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    public HashMap<Integer, BalanceAction> getBalanceActions() {
        return balanceActions;
    }

    public void setBalanceActions(HashMap<Integer, BalanceAction> balanceActions) {
        this.balanceActions = balanceActions;
    }

    public void deposit(Date dateOfAction, float amountToAdd){
        BalanceAction balanceAction = new BalanceAction(balance, balance + amountToAdd, "deposit", dateOfAction);
        balance += amountToAdd;
        balanceActions.put(++numberOfActions,balanceAction);
    }

    public void receivePayment(Date dateOfAction, float amountSold){
        BalanceAction balanceAction = new BalanceAction(balance, balance + amountSold, "receive payment", dateOfAction);
        balance += amountSold;
        balanceActions.put(++numberOfActions,balanceAction);
    }

    public void buy(Date dateOfAction, float amountBought){
        BalanceAction balanceAction = new BalanceAction(balance, balance - amountBought, "buying from store", dateOfAction);
        balance -= amountBought;
        balanceActions.put(++numberOfActions,balanceAction);
    }

    public static void main(String[] args) {
        Date date = new Date();
        SimpleDateFormat DateFor = new SimpleDateFormat("dd/MM/yyyy");
        String stringDate= DateFor.format(date);

        Balance balance = new Balance();
        balance.deposit(date,20);
        balance.buy(date, 10);
        balance.receivePayment(date, 10);

    }
}
