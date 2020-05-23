package loadedQuestions.game;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.util.*;

@Data
@Entity
public class Game {
    public static final String GAME_STATE_NOT_STARTED = "NOT_STARTED"; // Can move to GUESSING
    public static final String GAME_STATE_ASKING = "ASKING";
    public static final String GAME_STATE_ANSWERING = "ANSWERING";
    public static final String GAME_STATE_GUESSING = "GUESSING"; // Can move to RESULTS
    public static final String GAME_STATE_RESULTS = "RESULTS"; // Can move to GUESSING or FINAL_RESULTS
    public static final String GAME_STATE_FINAL_RESULTS = "FINAL_RESULTS"; // terminal state

    public static final Integer SCORE_MULTIPLIER = 100;
    public static final Integer BONUS_SCORE = 1000;

    public static final int CODE_LENGTH = 4;

    @Id
    private String code;
    private String state;
    private Integer round;
    private String currentQuestion;
    private List<Answer> answers;
    private List<Answer> results;
    private Integer score;
    private Integer bonusScore;

    public Game(String code, String state) {
        this.code = code;
        this.state = state;
        this.round = 0;
        this.answers = new ArrayList<>();
        this.results = new ArrayList<>();
    }

    public String getCode() {
        return this.code;
    }

    public String getState() {
        return this.state;
    }

    public Integer getRound() {
        return this.round;
    }

    public String getCurrentQuestion() {
        return this.currentQuestion;
    }

    public List<Answer> getAnswers() {
        Collections.shuffle(this.answers);
        return this.answers;
    }

    public List<Answer> getResults() {
        return this.results;
    }

    public Integer getScore() {
        return this.score;
    }

    public Integer getBonusScore() {
        return this.bonusScore;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCurrentQuestion(String question) {
        this.currentQuestion = question;
    }

    public Map<String, Answer> getAnswersHash() {
        Map<String, Answer> answerHash = new HashMap();
        this.answers.forEach(answer -> {
            answerHash.put(answer.getToken(), answer);
        });
        return answerHash;
    }

    public void addAnswer(String answer, String token) {
        this.answers.add(new Answer(answer, token));
    }

    public void addResult(Answer result) {
        if (this.results == null) {
            this.results = new ArrayList<>();
        }
        this.results.add(result);
    }

    public void nextRound() {
        this.state = GAME_STATE_ASKING;
        this.answers = new ArrayList<>();
        this.results = new ArrayList<>();
        this.round += 1;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setBonusScore(int score) {
        this.bonusScore = score;
    }
}
