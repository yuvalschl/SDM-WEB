package SDM.servlets;

import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Item.Item;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicReference;

public class ItemDataServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zoneNAme");
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            //String json = gson.toJson(currZoneManager.getAllItems());
          //  out.println(json.get());
            out.flush();
        }
    }
}
