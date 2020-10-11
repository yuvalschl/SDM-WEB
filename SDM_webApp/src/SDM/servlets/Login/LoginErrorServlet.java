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

public class LoginErrorServlet extends HttpServlet {
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (PrintWriter out = resp.getWriter()){
            String usernameFromSession = SessionUtils.getUsername(req);
            String usernameFromParameter = req.getParameter(Constants.USERNAME) != null ? req.getParameter(Constants.USERNAME) : "";
            Object errorMessage = req.getAttribute(Constants.ERROR_MSG);
            Gson gson = new Gson();
/*            LoginErrorDto loginErrorDto = new LoginErrorDto(usernameFromSession, usernameFromParameter, errorMessage);
            out.println(gson.toJson(loginErrorDto))*/;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}
