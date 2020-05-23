package loadedQuestions.auth;

import loadedQuestions.user.User;
import loadedQuestions.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Implement the UserDetailsService
 * This class products a function to load a user from the database by user name
 */
@Component
public class UserAuthorizationDetailsService implements UserDetailsService {
    /**
     * User repository, used to read user data from the database
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Attempt to retrieve user data from the database by username, in this case email is used
     *
     * @param username the users email
     * @return the UserDetails object
     * @throws UsernameNotFoundException an exception thrown when the user was not found in the database
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username);
        if (user != null) {
            return new UserAuthorizationDetails(user);
        }
        throw new UsernameNotFoundException(username);
    }
}