package SDM.servlets;

import SDM.utils.DTO.UserInfo;
import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import com.google.gson.Gson;
import users.Owner;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import static SDM.Constants.Constants.USERNAME;

public class NotificationsServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        try (PrintWriter out = resp.getWriter()) {
            Owner owner = (Owner)ServletUtils.getUserManager(getServletContext()).getUsers().get(SessionUtils.getUsername(req));
            ArrayList<Owner.Notification> notifications = owner.getNewNotifications();
            Gson gson = new Gson();
            String json = gson.toJson(notifications);
            out.println(json);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
