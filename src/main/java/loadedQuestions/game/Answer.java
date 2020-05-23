package loadedQuestions.game;

import lombok.Data;

@Data
public class Answer {
    private String answer;
    private String token;
    private Boolean guessedCorrectly;

    public Answer(String answer, String token) {
        this.answer = answer;
        this.token = token;
    }

    public String getAnswer() {
        return this.answer;
    }

    public String getToken() {
        return this.token;
    }

    public Boolean getGuessedCorrectly() {
        return this.guessedCorrectly;
    }

    public void setGuessedCorrectly(Boolean value) {
        this.guessedCorrectly = value;
    }
}
