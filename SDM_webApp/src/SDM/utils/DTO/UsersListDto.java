package SDM.utils.DTO;

import logicSDM.balance.Balance;
import users.SingelUserEntry;

public class UsersListDto {
    private String name;
    private boolean isOwner;

    public UsersListDto(SingelUserEntry singelUserEntry){
        this.name = singelUserEntry.getName();
        this.isOwner = singelUserEntry.isOwner();
    }
}
