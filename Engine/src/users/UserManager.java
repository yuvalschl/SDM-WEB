package users;


import java.util.*;

/*
Adding and retrieving users is synchronized and in that manner - these actions are thread safe
Note that asking if a user exists (isUserExists) does not participate in the synchronization and it is the responsibility
of the user of this class to handle the synchronization of isUserExists with other methods here on it's own
 */
public class UserManager {

    private final Map<String,SingelUserEntry> usersMap;
    private static int userID = 0;

    public UserManager() {
        usersMap = new HashMap<>();
    }

    public synchronized void addUser(String username, Boolean isOwner) {
        if (isOwner){
           Owner owner = new Owner(username);
            usersMap.put(username,owner);
        }
        else{
           Clinet clinet = new Clinet(username);
            usersMap.put(username,clinet);
        }
    }

    public synchronized void removeUser(String username) {
        usersMap.remove(username);
    }

    public synchronized Map<String,SingelUserEntry> getUsers() {
        return usersMap;
    }

    public boolean isUserExists(String username) {
        username = username.toLowerCase();
        return usersMap.containsKey(username);
    }
}
