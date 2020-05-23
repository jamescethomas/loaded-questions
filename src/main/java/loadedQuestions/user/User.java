package loadedQuestions.user;


import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.util.UUID;

/**
 * Class used to represent a user
 */
@Data
@Entity
public class User {
    public static final String ROLE_NONE = "NONE";
    public static final String ROLE_READ = "READ";
    public static final String ROLE_GUESS = "GUESS";

    private String name;
    private String gameCode;
    @Id private String token;
    private Boolean isLeader;
    private String role; // GUESS, READ, NONE
    private Integer score;
    private Integer likes;

    /**
     * Construct a user with null attributes
     */
    public User() {
    }

    /**
     * User constructor
     *
     * @param name     String
     * @param gameCode String
     * @param isLeader boolean
     * @param  role    String
     */
    public User(String name, String gameCode, Boolean isLeader, String role) {
        this.name = name;
        this.gameCode = gameCode;
        this.token = UUID.randomUUID().toString();
        this.isLeader = isLeader;
        this.role = role;
        this.score = 0;
        this.likes = 0;
    }

    public String getName() {
        return this.name;
    }

    public String getToken() {
        return this.token;
    }

    public String getGameCode() {
        return this.gameCode;
    }

    public String getRole(){
        return this.role;
    }

    public Boolean getIsLeader() {
        return this.isLeader;
    }

    public Integer getScore() {
        return this.score;
    }

    public Integer getLikes() {
        return this.likes;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void incrementScore(int value) {
        if (this.score == null ) {
            this.score = 0;
        }
        this.score += value;
    }

    public void incrementLikes(int value) {
        if (this.likes == null) {
            this.likes = 0;
        }
        this.likes += value;
    }

    boolean isValid() {
        return (this.name != null) && (this.gameCode != null);
    }
}
