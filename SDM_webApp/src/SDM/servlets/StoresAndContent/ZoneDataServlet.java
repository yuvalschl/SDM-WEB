package SDM.servlets.StoresAndContent;

import SDM.utils.ServletUtils;
import SDM.utils.DTO.ZoneInfo;
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
import java.util.Map;

public class ZoneDataServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        try (PrintWriter out = resp.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            Map<String, StoreManager> allZones = allZonesManager.getAllZones();
            ArrayList<ZoneInfo> zoneInfoArrayList = new ArrayList<>();
            allZones.forEach((id, zone) -> { zoneInfoArrayList.add(new ZoneInfo(zone)); });
            String json = gson.toJson(zoneInfoArrayList);
            out.println(json);
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
