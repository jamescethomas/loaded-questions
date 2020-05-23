package loadedQuestions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the spring application
 */
@SpringBootApplication
public class Application {
    /**
     * Run the spring application
     * @param args program arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}