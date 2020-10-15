package SDM.servlets.placeOrder;

import SDM.utils.DTO.StoreInfo;
import SDM.utils.DTO.discountInfo.OfferDto;
import SDM.utils.DTO.orderAndDiscountWrapper.OrderAndDiscountWrapperDTO;
import SDM.utils.DTO.orderInfo.ItemDTO;
import SDM.utils.DTO.orderInfo.OrderDTO;
import SDM.utils.DTO.orderInfo.StoreDTO;
import SDM.utils.ServletUtils;
import SDM.utils.DTO.discountInfo.DiscountDto;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Item.Item;
import logicSDM.Item.sellBy;
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
            String isOrderApproved = req.getParameter("approved");
            boolean orderApproved = false;
            if(isOrderApproved != null) {
                orderApproved = true;
            }
            String zoneName = req.getParameter("zonename");
            String store = req.getParameter("store");
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            Clinet user = (Clinet) ServletUtils.getUserManager(getServletContext()).getUsers().get(userName);
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
            int key = 1;
            for (Object val: itemsJSN.values()){
                String name = (String) ((LinkedHashMap) val).get("_name");
                String idString = (String) ((LinkedHashMap) val).get("_id");
                String amountString = (String) ((LinkedHashMap) val).get("_amount");
                int id = Integer.parseInt(idString);
                int amount = Integer.parseInt(amountString);
                ItemAmountAndStore currItemAmounAndStore;
                if(typeOfOrder.equals("dynamic") ){
                    currItemAmounAndStore = currZoneManager.getCheapestItem(id);
                    currItemAmounAndStore.setAmount(amount);
                }else{
                    Store currStore = currZoneManager.getAllStores().get(Integer.parseInt(store));
                    Item item = currStore.getInventory().get(id);
                    currItemAmounAndStore = new ItemAmountAndStore(item,amount,currStore);
                }
                items.put(key, currItemAmounAndStore);
                key++;
            }
            LinkedHashMap discountItemsJSN = gson.fromJson(itemsString, LinkedHashMap.class);
            addDiscountItemsToOrder(items, (LinkedHashMap) discountItemsJSN.get("_discountItems"), currZoneManager, key);
            Order order = currZoneManager.createOrder(location,date, items, user);
            if(orderApproved){
               currZoneManager.placeOrder(order);
            }
            else{
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
                OrderDTO orderDTO = createOrderDTO(order,currZoneManager);
                OrderAndDiscountWrapperDTO orderAndDiscountDTO = wrapOrderAndDiscounts(orderDTO, discountDtos);
                String json = gson.toJson(orderAndDiscountDTO);
                out.println(json);
                out.flush();
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    private void addDiscountItemsToOrder(HashMap<Integer, ItemAmountAndStore> itemsInOrder, LinkedHashMap itemsToAdd, StoreManager currZoneManager, int key) {
        for (Object val: itemsToAdd.values()){
            String name = (String) ((LinkedHashMap) val).get("_name");
           //String idString = (int) ((LinkedHashMap) val).get("_id");
            //String amountString = (String) ((LinkedHashMap) val).get("_amount");
            String storeIdString = (String) ((LinkedHashMap) val).get("_storeId");
            //String priceString = (String) ((LinkedHashMap) val).get("_forAdditional");
            Double doubleId = (Double) ((LinkedHashMap) val).get("_id");
            int id = doubleId.intValue();
            Double amountDouble = (Double) ((LinkedHashMap) val).get("_amount");
            int amount = amountDouble.intValue();
            int storeID = Integer.parseInt(storeIdString);
            Double priceDouble =  (Double) ((LinkedHashMap) val).get("_forAdditional");
            float price =  priceDouble.floatValue();
            Store currStore = currZoneManager.getAllStores().get(storeID);
            sellBy sellBy = currStore.getInventory().get(id).getSellBy();
            Item item = new Item(id,name, price,sellBy );
            ItemAmountAndStore currItemAmounAndStore = new ItemAmountAndStore(item,amount,currStore);
            currItemAmounAndStore.setPartOfDiscount(true);
            itemsInOrder.put(key,currItemAmounAndStore);
            item.setMaxID(++key);
        }
    }

    private OrderAndDiscountWrapperDTO wrapOrderAndDiscounts(OrderDTO orderDTO, ArrayList<DiscountDto> discountDto){
        OrderAndDiscountWrapperDTO orderAndDiscountDTO = new OrderAndDiscountWrapperDTO(discountDto, orderDTO);
        return  orderAndDiscountDTO;
    }
    private OrderDTO createOrderDTO(Order order, StoreManager storeManager){
        ArrayList<StoreDTO> stores = creatStoreDTOArray(order, storeManager);
        OrderDTO orderDTO = new OrderDTO(stores, order.getTotalCost(),order.getShippingCost(), order.getTotalPriceOfItems(), storeManager.getAllItems().get(1).getMaxID());
       return orderDTO;
    }

    private ArrayList<StoreDTO> creatStoreDTOArray(Order order, StoreManager storeManager){
        ArrayList<StoreDTO> stores = new ArrayList<StoreDTO>();
        for(Store store: order.getStores().values()){
           float shippingCost = order.getShippingCostByStore().get(store.getSerialNumber());
           float distance = storeManager.distanceCalculator(store.getLocation(), order.getCustomerLocation());
           float ppk = store.getPPK();
           ArrayList<ItemDTO> itemsDto = creatItemDTOArray(order, store);
           StoreDTO storeDTO = new StoreDTO(itemsDto, store.getName(), store.getSerialNumber(), ppk, distance, shippingCost);
           stores.add(storeDTO);
        }
        return stores;
    }
    private ArrayList<ItemDTO> creatItemDTOArray(Order order, Store store) {
        ArrayList<ItemDTO> items = new ArrayList<ItemDTO>();
        String isPartOfSale = "NO";
        float pricePerUnit, totalItemCost;
        for(ItemAmountAndStore item : order.getItemAmountAndStores().values()){
            if(item.getStore().getSerialNumber() == store.getSerialNumber()){
               if(item.getIsPartOfDiscount()){
                   isPartOfSale  = "YES";
                   pricePerUnit = item.getItem().getPrice();
                   totalItemCost = pricePerUnit;
               }
               else {
                   pricePerUnit = store.getInventory().get(item.getItemId()).getPrice();
                   totalItemCost = pricePerUnit * item.getAmount();
               }
                ItemDTO dtoItem = new ItemDTO(item.getItemName(), item.getItemId(),item.getAmount(),item.getItem().getSellBy().toString(),isPartOfSale, pricePerUnit,totalItemCost );
                items.add(dtoItem);
            }
        }

        return items;
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
