package SDM.servlets.MainPage.OwnerServlets.StoresHistoryServlet;

import SDM.utils.DTO.OrderHistory.OrderHistoryDto;
import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import users.Owner;
import users.UserManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static SDM.Constants.Constants.USERNAME;

/**
 * servlet for getting the order history of all the owner stores
 */
public class StoresHistoryServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {

        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            Owner owner = (Owner) (userManager.getUsers().get(userName));
            ArrayList<OrderHistoryDto> orderDtoMap = new ArrayList<>();
            ArrayList<StoreNameAndId> allStores = new ArrayList<>();
            String zoneName = req.getParameter("zone");
            owner.getAllZones().get(zoneName).forEach((id, store) -> allStores.add(new StoreNameAndId(store.getName(), id)));
            owner.getAllZones().get(zoneName).forEach((id, store) -> store.getAllOrders().forEach((integer, storeOrder) -> orderDtoMap.add(new OrderHistoryDto(storeOrder))));
            Gson gson = new Gson();
            out.println(gson.toJson(new OrderAndStores(allStores, orderDtoMap)));
            out.flush();
        }
        catch (Exception e){
            System.out.println("error in OrderHistoryServlet");
            e.printStackTrace();
        }
    }

    private static class StoreNameAndId{
        private String storeName;
        private int storeId;

        public StoreNameAndId(String storeName, int storeId) {
            this.storeName = storeName;
            this.storeId = storeId;
        }
    }

    public class OrderAndStores {
        ArrayList<StoreNameAndId> allStores;
        ArrayList<OrderHistoryDto> allOrders;

        public OrderAndStores(ArrayList<StoreNameAndId> allStores, ArrayList<OrderHistoryDto>  orderDtoMap){
            this.allStores = allStores;
            this.allOrders = orderDtoMap;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
