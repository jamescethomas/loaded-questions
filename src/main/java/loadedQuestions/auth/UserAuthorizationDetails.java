package loadedQuestions.auth;

import loadedQuestions.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

/**
 * Class used for spring basic authentication
 */
public class UserAuthorizationDetails implements UserDetails {
    /**
     * The user
     */
    private User user;

    /**
     * Construct the user authorization class passing in a user object
     *
     * @param user the user
     */
    UserAuthorizationDetails(User user) {
        this.user = user;
    }

    /**
     * Class required by UserDetails, unused in this implementation
     *
     * @return null
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * Read the user password from the user object
     *
     * @return the user's password
     */
    @Override
    public String getPassword() {
        return this.user.getToken();
    }

    /**
     * Read the user name, in this case the users email, from the user object
     *
     * @return the user's email
     */
    @Override
    public String getUsername() {
        return this.user.getName();
    }

    /**
     * Function required by UserDetails, always true in this implementation
     *
     * @return null
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Function required by UserDetails, always true in this implementation
     *
     * @return null
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Function required by UserDetails, always true in this implementation
     *
     * @return null
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Function required by UserDetails, always true in this implementation
     *
     * @return null
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}