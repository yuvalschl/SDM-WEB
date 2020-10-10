package SDM.servlets.StoresAndContent;

import SDM.utils.ItemsInfoForJson;
import SDM.utils.ServletUtils;
import SDM.utils.UserInfo;
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

public class getUserServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (PrintWriter out = resp.getWriter()) {
            Gson gson = new Gson();
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            String isOwner = req.getSession(false).getAttribute("isOwner").toString();
            String json = gson.toJson(new UserInfo(userName, isOwner));
            out.println(json);
            out.flush();
        }
    }

        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            processRequest(req, resp);
        }
}
