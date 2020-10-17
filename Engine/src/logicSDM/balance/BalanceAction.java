package logicSDM.balance;

import java.util.Date;

public class BalanceAction {


    private int orderID;
    private float balanceBeforeAction;
    private float balanceAfterAction;
    private String typeOfAction;
    Date dateOfAction;

    public BalanceAction(float balanceBeforeAction, float balanceAfterAction, String typeOfAction, Date date){
        this.balanceAfterAction =  balanceAfterAction;
        this.balanceBeforeAction = balanceBeforeAction;
        this.typeOfAction = typeOfAction;
        this.dateOfAction = date;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public float getBalanceBeforeAction() {
        return balanceBeforeAction;
    }

    public void setBalanceBeforeAction(float balanceBeforeAction) {
        this.balanceBeforeAction = balanceBeforeAction;
    }

    public float getBalanceAfterAction() {
        return balanceAfterAction;
    }

    public void setBalanceAfterAction(float balanceAfterAction) {
        this.balanceAfterAction = balanceAfterAction;
    }

    public String getTypeOfAction() {
        return typeOfAction;
    }

    public void setTypeOfAction(String typeOfAction) {
        this.typeOfAction = typeOfAction;
    }

    public Date getDateOfAction() {
        return dateOfAction;
    }

    public void setDateOfAction(Date dateOfAction) {
        this.dateOfAction = dateOfAction;
    }
}
