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
import java.util.Date;

import static SDM.Constants.Constants.USERNAME;

public class DepositServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp){
        try(PrintWriter out = resp.getWriter()){
            String dateString = req.getParameter("date");
            String amountString = req.getParameter("amount");
            Date date = new Date(dateString);
            float amount = Float.parseFloat(amountString);
            String userName = req.getSession(false).getAttribute(USERNAME).toString();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            Clinet clinet = (Clinet) userManager.getUsers().get(userName);
            clinet.getBalance().deposit(date, amount);
            Gson gson = new Gson();
            String json = gson.toJson(clinet.getBalance());
            out.println(json);
            out.flush();
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
