import Item.*;
import Order.Order;
import StoreManager.StoreManager;
import com.google.gson.Gson;

public class testDep {
    public void foo(){
        StoreManager storeManager = new StoreManager();
        Gson gson = new Gson();
        UnitItem  item = new UnitItem(7,"yaron");
        String str = gson.toJson(item);
        System.out.println(str);
    }

    public static void main(String[] args) {
       testDep testDep1 = new testDep();
       testDep1.foo();
    }
}
