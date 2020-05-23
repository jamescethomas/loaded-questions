package loadedQuestions.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configure cross-origin resource sharing for the web server
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    /**
     * Add mappings to the cross-origin resource sharing registry
     *
     * @param registry the cross-origin resource sharing registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
         // registry.addMapping("/**").allowedOrigins("*");
         registry
                 .addMapping("/**")
                 .allowedOrigins("http://localhost:8080");
        registry
                .addMapping("/api/**")
                .allowedMethods("GET")
                .allowedMethods("POST")
                .allowedHeaders("Authorization")
                .allowedOrigins("http://localhost:8080");
    }
}