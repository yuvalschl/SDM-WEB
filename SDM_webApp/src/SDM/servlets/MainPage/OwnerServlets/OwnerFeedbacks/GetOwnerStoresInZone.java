package SDM.servlets.MainPage.OwnerServlets.OwnerFeedbacks;

import SDM.servlets.MainPage.OwnerServlets.StoresHistoryServlet.StoresHistoryServlet;
import SDM.utils.DTO.OrderHistory.OrderHistoryDto;
import SDM.utils.DTO.StoreInfo;
import SDM.utils.DTO.orderInfo.StoreDTO;
import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Order.Order;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;
import users.Clinet;
import users.Owner;
import users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static SDM.Constants.Constants.USERNAME;

public class GetOwnerStoresInZone extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res){
        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            String userName = SessionUtils.getUsername(req);
            Owner owner = (Owner) ServletUtils.getUserManager(getServletContext()).getUsers().get(userName);
            String zoneName = req.getParameter("zone");
            StoreManager storeManager = ServletUtils.getAllZoneManager(getServletContext()).getAllZones().get(zoneName);
            ArrayList<StoreNameAndId> storesToReturn = new ArrayList<>();
            Collection<Store> stores = ServletUtils.getAllZoneManager(getServletContext()).getAllZones().get(zoneName).getAllStores().values();
            for(Store store : stores){
                if(store.getStoreOwner().equals(owner)){
                    storesToReturn.add(new StoreNameAndId(store.getName(), store.getSerialNumber()));
                }
            }
            Gson gson = new Gson();
            out.println(gson.toJson(storesToReturn));
            out.flush();
        }
        catch (Exception e){
            System.out.println("error in OrderHistoryServlet");
            e.printStackTrace();
        }
    }

    public static class StoreNameAndId{
        private String storeName;
        private int storeId;

        public StoreNameAndId(String storeName, int storeId) {
            this.storeName = storeName;
            this.storeId = storeId;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
