package SDM.servlets.MainPage;

import SDM.utils.ItemsInfoForJson;
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

public class ItemDataServlet extends HttpServlet {

    /**
     * servlet for getting all the items sold in a zone
     * @param req
     * @param res
     * @throws IOException
     */
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        try (PrintWriter out = res.getWriter()) {
            Gson gson = new Gson();
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zonename");
            StoreManager currZoneManager = allZonesManager.getStoreMangerForZone(zoneName);
            ArrayList<ItemsInfoForJson> itemInfoToConvertToJson = new ArrayList<>();
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            String isOwner = req.getSession(false).getAttribute("isOwner").toString();
            currZoneManager.getAllItems().forEach((key, item)->{itemInfoToConvertToJson.add(new ItemsInfoForJson(item, currZoneManager, isOwner,userName));});
            String json = gson.toJson(itemInfoToConvertToJson);
            out.println(json);
            out.flush();
        }
        catch (Exception e){
            System.out.println("error");
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
