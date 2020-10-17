package SDM.servlets.MainPage.OwnerServlets.AddStore;

import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import com.google.gson.Gson;
import logicSDM.Item.Item;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;
import users.Owner;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class AddStoreServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        try{
            String storeNameFromParameter = req.getParameter("name");
            int ppkFromParameter = Integer.parseInt(req.getParameter("ppk"));
            String xFromParameter = req.getParameter("x");
            String yFromParameter = req.getParameter("y");
            Point storeLocation = new Point(Integer.parseInt(xFromParameter), Integer.parseInt(yFromParameter));
            String itemsFromParameter = req.getParameter("items");
            String zoneName = req.getParameter("zone");
            Owner owner =  (Owner) ServletUtils.getUserManager(getServletContext()).getUsers().get(SessionUtils.getUsername(req));
            Gson gson = new Gson();
            ArrayList stringItems = gson.fromJson(itemsFromParameter, ArrayList.class);
            HashMap<Integer, Item> items = new HashMap<Integer, Item>();
            StoreManager storeManager = ServletUtils.getAllZoneManager(getServletContext()).getStoreMangerForZone(zoneName);
            for(Object stringItem : stringItems){
                LinkedHashMap item = (LinkedHashMap)stringItem;
                String name = (String)item.get("_name");
                int id = Integer.parseInt((String) item.get("_id"));
                float price = Float.parseFloat((String) item.get("_price"));
                Item itemFromSystem = storeManager.getAllItems().get(id);
                items.put(id ,new Item(id, name, price, itemFromSystem.getSellBy()));
            }
            int maxId = storeManager.getAllStores().keySet().stream().max(Integer::compareTo).get();
            storeManager.addNewStore(new Store(storeNameFromParameter, storeLocation, items, ppkFromParameter, maxId + 1, owner, zoneName));
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
