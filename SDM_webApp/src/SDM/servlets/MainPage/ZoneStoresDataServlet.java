package SDM.servlets.MainPage;

import SDM.utils.ServletUtils;
import SDM.utils.StoreInfo;
import SDM.utils.ZoneInfo;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

public class ZoneStoresDataServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        try(PrintWriter out = resp.getWriter()){
            String zoneName = req.getParameter("zoneName");
            String storeId = req.getParameter("storeId");
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            StoreManager storeManager = allZonesManager.getAllZones().get(zoneName);
            Store store = storeManager.getAllStores().get(storeId);
            StoreInfo storeInfo = new StoreInfo(store.getName(), store.getSerialNumber(), store.getStoreOwner().getName(),store.getX(),
                    store.getY(),store.getAllOrders().size(), (int) store.getPPK(), store.getTotalDeliveriesCost());
            Gson gson = new Gson();
            String json = gson.toJson(storeInfo);
            out.println(json);
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
