package SDM.servlets.Login;

import SDM.Constants.Constants;
import SDM.utils.LoginErrorDto;
import SDM.utils.SessionUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static SDM.Constants.Constants.*;

public class LoginErrorServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (PrintWriter out = resp.getWriter()){
            String userName = req.getSession(false).getAttribute(USER_NAME_ERROR).toString();
            String errorMessage = req.getSession(false).getAttribute(ERROR_MSG).toString();
            Gson gson = new Gson();
            LoginErrorDto loginErrorDto = new LoginErrorDto(userName, errorMessage);
            out.println(gson.toJson(loginErrorDto));
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
