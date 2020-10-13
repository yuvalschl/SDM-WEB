package SDM.servlets.placeOrder;

import SDM.utils.DTO.discountInfo.OfferDto;
import SDM.utils.ServletUtils;
import SDM.utils.DTO.discountInfo.DiscountDto;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Item.Item;
import logicSDM.ItemPair.ItemAmountAndStore;
import logicSDM.Order.Order;
import logicSDM.Store.Discount.Discount;
import logicSDM.Store.Discount.Offer;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;
import users.Clinet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import static SDM.Constants.Constants.USERNAME;

public class CreatOrderServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try {
            PrintWriter out = res.getWriter();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zonename");
            String store = req.getParameter("store");
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            Clinet user = new Clinet(userName);
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            Gson gson = new Gson();
            String typeOfOrder = req.getParameter("type");
            String dateString = req.getParameter("date");
            Date date = new Date(dateString);
            String locationString = req.getParameter("location");
            Point location = gson.fromJson(locationString, Point.class);
            String itemsString = req.getParameter("items");
            LinkedHashMap itemsJSN = gson.fromJson(itemsString, LinkedHashMap.class);
            itemsJSN = (LinkedHashMap) itemsJSN.get("_items");
            HashMap<Integer, ItemAmountAndStore> items = new HashMap<Integer, ItemAmountAndStore>();
            String key ="1";
            for (Object val: itemsJSN.values()){
                String name = (String) ((LinkedHashMap) val).get("_name");
                String idString = (String) ((LinkedHashMap) val).get("_id");
                String amountString = (String) ((LinkedHashMap) val).get("_amount");
                int id = Integer.parseInt(idString);
                float amount = Float.parseFloat(amountString);
                ItemAmountAndStore currItemAmounAndStore;
                if(typeOfOrder.equals("dynamic") ){
                    currItemAmounAndStore = currZoneManager.getCheapestItem(id);
                    currItemAmounAndStore.setAmount(amount);
                }else{
                    Store currStore = currZoneManager.getAllStores().get(Integer.parseInt(store));
                    Item item = currStore.getInventory().get(id);
                    currItemAmounAndStore = new ItemAmountAndStore(item,amount,currStore);
                }
                items.put(id, currItemAmounAndStore);
            }
            Order order = currZoneManager.createOrder(location,date, items, user);
            ArrayList<Discount> discounts = currZoneManager.getEntitledDiscounts(order);
            ArrayList<DiscountDto> discountDtos = new ArrayList<>();
            ArrayList<OfferDto> offerDto = new ArrayList<>(); // this is for adding the item name to the discount
            for (Discount discount: discounts){
                Map<Integer, Item> currentStoreInventory = currZoneManager.getAllStores().get(discount.getStoreId()).getInventory();
                for(Offer offer : discount.getThenYouGet().getAllOffers()){
                    // getting the item name in the offer
                    offerDto.add(new OfferDto(offer, currentStoreInventory.get(offer.getItemId()).getName()));
                }
                discountDtos.add(new DiscountDto(discount, offerDto, currentStoreInventory.get(discount.getIfYouBuy().getItemId()).getName()));
            }
            String json = gson.toJson(discountDtos);
            out.println(json);
            out.flush();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}