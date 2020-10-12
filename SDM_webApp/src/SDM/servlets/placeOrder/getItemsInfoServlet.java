package SDM.servlets.placeOrder;

import SDM.utils.placeOrderutils.ItemNamePriceAndId;
import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import static SDM.Constants.Constants.USERNAME;

public class getItemsInfoServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zonename");
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            ArrayList<ItemNamePriceAndId> itemInfoToConvertToJson = new ArrayList<>();
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            String isOwner = req.getSession(false).getAttribute("isOwner").toString();
            currZoneManager.getAllItems().forEach((key, item)->{itemInfoToConvertToJson.add(new ItemNamePriceAndId(item.getName(), item.getPrice(), item.getId(), item.getSellBy().toString()));});
            String json = gson.toJson(itemInfoToConvertToJson);
            out.println(json);
            out.flush();
        }
        catch (Exception e){
            System.out.println("error in itemDataServlet");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
