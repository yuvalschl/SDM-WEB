package SDM.servlets.MainPage.Feedback;

import SDM.utils.ServletUtils;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Store.Feedback.Feedback;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AddFeedback extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        try{
            String feedback = req.getParameter("feedback");
            int rating = Integer.parseInt(req.getParameter("rating"));
            Feedback feedbackToAdd = new Feedback();
            feedbackToAdd.setFeedback(feedback);
            feedbackToAdd.setRating(rating);
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
