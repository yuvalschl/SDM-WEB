package users;


import java.util.*;

/*
Adding and retrieving users is synchronized and in that manner - these actions are thread safe
Note that asking if a user exists (isUserExists) does not participate in the synchronization and it is the responsibility
of the user of this class to handle the synchronization of isUserExists with other methods here on it's own
 */
public class UserManager {

    private final Map<Integer,SingelUserEntry> usersSet;
    private static int userID =0;
    public UserManager() {
        usersSet = new HashMap<>();
    }

    public synchronized void addUser(String username, Boolean isOwner) {
        if (isOwner){
           Owner owner = new Owner(username);
            usersSet.put(++userID,owner);
        }
        else{
           Clinet clinet = new Clinet(username);
            usersSet.put(++userID,clinet);
        }
    }

    public synchronized void removeUser(String username) {
        usersSet.remove(username);
    }

    public synchronized Map<Integer,SingelUserEntry> getUsers() {
        return Collections.unmodifiableMap(usersSet);
    }

    public boolean isUserExists(String username) {
        return usersSet.containsValue(username);
    }
}
