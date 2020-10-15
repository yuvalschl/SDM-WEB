package SDM.servlets.MainPage.OrderHistory;

import SDM.utils.DTO.OrderHistory.OrderDto;
import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.Order.Order;
import users.Clinet;
import users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import static SDM.Constants.Constants.USERNAME;

/**
 * servlet for getting the order history of a client
 */
public class OrderHistoryServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {

        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            Clinet clinet = (Clinet) (userManager.getUsers().get(userName));
            Map<Integer, Order> orderHistory = clinet.getOrderHistory();
            Map<Integer, OrderDto> orderDtoMap = new HashMap<>();
            orderHistory.forEach((id, order) -> orderDtoMap.put(id, new OrderDto(order)));
            Gson gson = new Gson();
            out.println(gson.toJson(orderDtoMap));
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
