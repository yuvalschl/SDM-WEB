package SDM.servlets.StoresAndContent;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static SDM.Constants.Constants.ZONENAME;


public class MoveToZonePageServlet extends HttpServlet {
    public final String STORES_AND_CONTENT_URL = "storesAreaAndContent.html";
    public final String ZONE_PAGE_URL = "/SDM/pages/localStores/localStores.html";

    private void processRequests(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String zoneName = req.getParameter("zoneName");
        if(zoneName == null || zoneName.isEmpty()){
            resp.sendRedirect(STORES_AND_CONTENT_URL);
        }
        else {
            synchronized (this){
                req.getSession(true).setAttribute(ZONENAME, zoneName);
                resp.getWriter().println(ZONE_PAGE_URL);
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequests(req,resp);
    }
}
