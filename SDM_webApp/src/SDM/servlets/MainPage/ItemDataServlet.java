package SDM.servlets.MainPage;

import SDM.utils.ItemsInfoForJson;
import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class ItemDataServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zoneNAme");
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            ArrayList<ItemsInfoForJson> itemInfoToConvertToJson = new ArrayList<>();
            currZoneManager.getAllItems().forEach((key, item)->{itemInfoToConvertToJson.add(new ItemsInfoForJson(item, currZoneManager));});
            String json = gson.toJson(itemInfoToConvertToJson);
            out.println(json);
            out.flush();
        }
    }
}
