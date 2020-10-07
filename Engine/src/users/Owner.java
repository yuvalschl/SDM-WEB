package users;

public class Owner extends SingelUserEntry {

    public Owner(String name){
        super(name);
        super.setOwner(true);
    }
    public boolean isOwner(){return true;};

}
