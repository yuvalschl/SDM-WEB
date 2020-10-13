package users;

public class Clinet extends  SingelUserEntry {

    public Clinet(String name) {
        super(name);
        super.setOwner(false);
    }
    public boolean isOwner(){return false;};
}
