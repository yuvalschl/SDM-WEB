package users;


import java.util.*;

/*
Adding and retrieving users is synchronized and in that manner - these actions are thread safe
Note that asking if a user exists (isUserExists) does not participate in the synchronization and it is the responsibility
of the user of this class to handle the synchronization of isUserExists with other methods here on it's own
 */
public class UserManager {

    private final Map<String,Boolean> usersSet;

    public UserManager() {
        usersSet = new HashMap<>();
    }

    public synchronized void addUser(String username, Boolean isOwner) {
        usersSet.put(username,isOwner);
    }

    public synchronized void removeUser(String username) {
        usersSet.remove(username);
    }

    public synchronized Map<String,Boolean> getUsers() {
        return Collections.unmodifiableMap(usersSet);
    }

    public boolean isUserExists(String username) {
        return usersSet.containsValue(username);
    }
}
