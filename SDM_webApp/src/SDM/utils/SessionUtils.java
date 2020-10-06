package SDM.utils;

import SDM.Constants.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtils {

    public static String getUsername (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.USERNAME) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static boolean isOwner(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session;
        boolean owner =false;
        if(session != null){
            if(session.getAttribute("store_owner") == "on")
                owner = true;
        }
        return owner;
    }

    public static void clearSession (HttpServletRequest request) {
        request.getSession().invalidate();
    }

}
