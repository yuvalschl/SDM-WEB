package SDM.servlets.Account;

import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import logicSDM.balance.Balance;
import users.Clinet;
import users.Owner;
import users.SingelUserEntry;
import users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static SDM.Constants.Constants.USERNAME;

public class getAccountServlet extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        resp.setContentType("application/json");
        try(PrintWriter out = resp.getWriter()){
            String isOwner = req.getParameter("isOwner");
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            SingelUserEntry user;
            if (isOwner == null){
                user = (Clinet) (userManager.getUsers().get(userName));
            }
            else{
                user = (Owner) (userManager.getUsers().get(userName));
            }
            Balance balance = user.getBalance();
            Gson gson = new Gson();
            String json = gson.toJson(balance);
            out.println(json);
            out.flush();
       }
        catch (Exception e){
            System.out.println("error in getAccountServlet");
        }



    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
