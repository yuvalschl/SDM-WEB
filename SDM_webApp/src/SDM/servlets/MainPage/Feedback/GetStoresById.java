package SDM.servlets.MainPage.Feedback;

import SDM.utils.ServletUtils;
import SDM.utils.DTO.StoreInfo;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.IntStream;

public class GetStoresById extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        try (PrintWriter out = resp.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zoneName");
            StoreManager currentZone = allZonesManager.getStoreMangerForZone(zoneName);
            String s = req.getParameter("orderStores");
            IntStream storesId = Arrays.stream(req.getParameter("orderStores").split(" ")).mapToInt(Integer::parseInt);
            ArrayList<Store> stores = new ArrayList<>();
            storesId.forEach(id -> stores.add(currentZone.getAllStores().get(id)));
            ArrayList<StoreInfo> storeInfos = new ArrayList<>();
            stores.forEach(store -> storeInfos.add(new StoreInfo(store.getName(), store.getSerialNumber())));
            String json = gson.toJson(storeInfos);
            out.println(json);
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
