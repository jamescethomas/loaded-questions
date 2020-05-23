package loadedQuestions.game;

import loadedQuestions.user.UserRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameState {
    @Autowired private GameRepository gameRepository;
    @Autowired private UserRepository userRepository;

    public Document constructGameState(String gameCode, String token) {
        Document gameState = new Document();
        gameState.put("game", gameRepository.findByCode(gameCode));

        gameState.put("players", userRepository.findAllByGameCode(gameCode));

        gameState.put("player", userRepository.findByToken(token));
        return gameState;
    }

    public Document constructPlayerlessGameSTate(String gameCode) {
        Document gameState = new Document();
        gameState.put("game", gameRepository.findByCode(gameCode));

        gameState.put("players", userRepository.findAllByGameCode(gameCode));
        return gameState;
    }
    /*
    Sample game object
    {
        game: {
            code: String
            state: [WAITING, WRITING_QUESTION, GUESSING, REVEAL FINISHED]
            turn: 0,

            current_token: player
            current_reader: player



            players: [player]
        },
        player: {
            name
            token
            score
        }
    }
     */
}
