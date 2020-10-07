package users;

public class Owner extends SingelUserEntry {

    Owner(String name){
        super(name);
        super.setOwner(true);
    }
    public boolean isOwner(){return true;};

}
