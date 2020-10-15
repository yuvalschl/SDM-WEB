package SDM.servlets.MainPage.OwnerServlets.OwnerFeedbacks;

import SDM.servlets.MainPage.OwnerServlets.StoresHistoryServlet.StoresHistoryServlet;
import SDM.utils.DTO.OrderHistory.OrderHistoryDto;
import SDM.utils.DTO.OwnerFeedback.OwnerFeedbackDto;
import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import com.google.gson.Gson;
import logicSDM.Store.Store;
import users.Owner;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class OwnerFeedbackServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {

        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            String storeId = req.getParameter("storeId");
            String zoneName = req.getParameter("zone");
            Store store = ServletUtils.getAllZoneManager(getServletContext()).getStoreMangerForZone(zoneName).getAllStores().get(Integer.parseInt(storeId));
            ArrayList<OwnerFeedbackDto> allFeedbacks = new ArrayList<>();
            store.getFeedbacks().forEach(feedback -> allFeedbacks.add(new OwnerFeedbackDto(feedback)));
            Gson gson = new Gson();
            out.println(gson.toJson(allFeedbacks));
            out.flush();
        }
        catch (Exception e){
            e.printStackTrace();
            System.out.println("error in OwnerFeedbackServlet");
        }
    }

    public class OrderAndStores {
        Map<Integer, String> allStores;
        ArrayList<OrderHistoryDto> allOrders;

        public OrderAndStores(Map<Integer, String> allStores, ArrayList<OrderHistoryDto>  orderDtoMap){
            this.allStores = allStores;
            this.allOrders = orderDtoMap;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
