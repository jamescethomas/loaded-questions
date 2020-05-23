package loadedQuestions.config;

import loadedQuestions.auth.AuthenticationEntryPoint;
import loadedQuestions.auth.UserAuthorizationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configure the application
 */
@Configuration
@EnableWebSecurity
public class ApplicationConfig extends WebSecurityConfigurerAdapter {

    /**
     * Call used to handle authenticated entry to APIs that require authentication
     */
    @Autowired
    private AuthenticationEntryPoint authEntryPoint;

    /**
     * Service used to authorize a user
     */
    @Autowired
    private UserAuthorizationDetailsService userDetailsService;

    /**
     * password encoder
     *
     * @return an instance of the password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configure the web servers security settings
     *
     * @param http object used to configure security for web requests
     * @throws Exception an exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                csrf().disable().cors().and()
                .authorizeRequests()
                .antMatchers("/createGame").permitAll()
                .antMatchers("/joinGame").permitAll()
                .antMatchers("/socket/**").permitAll()
                .antMatchers("/api/**")
                .authenticated();

        http.httpBasic().authenticationEntryPoint(authEntryPoint);
    }

    /**
     * Setup the authentication manager to use the user details service for authentication
     *
     * @param builder the AuthenticationManagerBuilder
     * @throws Exception an exception
     */
    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userDetailsService);
    }
}