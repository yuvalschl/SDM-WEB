package SDM.servlets.placeOrder;

import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;

public class CreatOrderServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try {
            PrintWriter out = res.getWriter();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zonename");
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            Gson gson = new Gson();
            String date = req.getParameter("location");
            String locationString = req.getParameter("location");
            Point location = gson.fromJson(locationString, Point.class);
            String itemsString = req.getParameter("items");
            LinkedHashMap items = gson.fromJson(itemsString, LinkedHashMap.class);
            Object yoav = items;

        }
        catch (Exception e){
            System.out.println("Error in create order servlet");
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
