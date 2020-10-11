package SDM.utils;


/**
 * dto used in the login error page servlet
 */
public class LoginErrorDto {
    private String userName;
    private String errorMsg;

    public LoginErrorDto(String userName, String errorMsg) {
        this.userName = userName;
        this.errorMsg = errorMsg;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
