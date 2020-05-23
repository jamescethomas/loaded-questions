package loadedQuestions.game;

public class GetGameStateMessage {
    private String code;
    private String token;

    public GetGameStateMessage() {
    }

    public GetGameStateMessage(String code, String token) {
        this.code = code;
        this.token = token;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
