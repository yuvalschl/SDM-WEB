package SDM.utils;


/**
 * dto used in the login error page servlet
 */
public class LoginErrorDto {
    private String userName;
    private String userName2;
    private String errorMsg;

    public LoginErrorDto(String userName, String userName2, String errorMsg) {
        this.userName = userName;
        this.userName2 = userName2;
        this.errorMsg = errorMsg;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName2() {
        return userName2;
    }

    public void setUserName2(String userName2) {
        this.userName2 = userName2;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
