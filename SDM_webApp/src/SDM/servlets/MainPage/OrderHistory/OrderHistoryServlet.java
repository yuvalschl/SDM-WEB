package SDM.servlets.MainPage.OrderHistory;

import SDM.utils.DTO.ItemsInfoForJson;
import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Order.Order;
import logicSDM.StoreManager.StoreManager;
import users.Clinet;
import users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Map;

import static SDM.Constants.Constants.USERNAME;

/**
 * servlet for getting the order history of a user
 */
public class OrderHistoryServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {

        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            Clinet clinet = (Clinet) (userManager.getUsers().get(userName));
            Map<Integer, Order> orderHistory = clinet.getOrderHistory();
            Gson gson = new Gson();
            out.println(gson.toJson(orderHistory));
            out.flush();
        }
        catch (Exception e){
            System.out.println("error in OrderHistoryServlet");
            e.printStackTrace();
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
