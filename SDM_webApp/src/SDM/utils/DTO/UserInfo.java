package SDM.utils.DTO;

public class UserInfo {
    private String userName;
    private String isOwner;

    public UserInfo(String userName, String isOwner) {
        this.userName = userName;
        this.isOwner = isOwner;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getIsOwner() {
        return isOwner;
    }

    public void setIsOwner(String isOwner) {
        this.isOwner = isOwner;
    }
}
