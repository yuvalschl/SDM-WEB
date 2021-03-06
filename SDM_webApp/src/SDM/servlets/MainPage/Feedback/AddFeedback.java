package SDM.servlets.MainPage.Feedback;

import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Store.Feedback.Feedback;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AddFeedback extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        try{
            String userName = SessionUtils.getUsername(req);
            String feedback = req.getParameter("feedback");
            Integer rating = -1;
            if (req.getParameter("rating") != null){
                rating = Integer.parseInt(req.getParameter("rating"));
            }
            //TODO: fix the date
            String date = req.getParameter("date");
            Date date1 = new Date();
            Feedback feedbackToAdd = new Feedback(rating, feedback, date1, userName);
            AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
            String zoneName = req.getParameter("zoneName");
            StoreManager currentZone = allZonesManager.getStoreMangerForZone(zoneName);
            Store store = currentZone.getAllStores().get(Integer.parseInt(req.getParameter("store")));
            store.addFeedback(feedbackToAdd);
            resp.setStatus(200);
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
