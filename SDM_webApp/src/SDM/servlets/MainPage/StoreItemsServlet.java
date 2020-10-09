package SDM.servlets.MainPage;

import SDM.utils.ServletUtils;
import SDM.utils.StoreInfo;
import SDM.utils.StoreItemInfo;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Item.Item;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class StoreItemsServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        try(PrintWriter out = resp.getWriter()){
            String storeId = req.getParameter("storeId");
            String zoneName = req.getParameter("zoneName");
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            StoreManager storeManager = allZonesManager.getAllZones().get(zoneName);
            Store store = storeManager.getAllStores().get(Integer.parseInt(storeId));
            Map<Integer, Item> itemHashMap = store.getInventory();
            ArrayList<StoreItemInfo> storeItemInfos = new ArrayList<>();
            itemHashMap.values().forEach(item -> storeItemInfos.add(new StoreItemInfo(item.getId(), item.getName(), item.getSellBy().name(), item.getPrice(), (int) item.getAmountSold())));
            Gson gson = new Gson();
            String json = gson.toJson(storeItemInfos);
            out.println(json);
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
