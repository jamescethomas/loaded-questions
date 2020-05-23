package loadedQuestions.game;

import loadedQuestions.user.User;
import loadedQuestions.user.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import static loadedQuestions.game.Game.*;
import static loadedQuestions.user.User.*;

@RestController
public class GameController {
    @Autowired
    GameMessageController gameMessageController;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GameState gameState;

    @PostMapping("/createGame")
    public ResponseEntity<Document> createGame(@RequestBody Map<String, Object> payload) {
        // Create the game
        String code = RandomStringUtils.randomAlphabetic(Game.CODE_LENGTH).toUpperCase();
        while (gameRepository.findByCode(code) != null) {
            code = RandomStringUtils.randomAlphabetic(Game.CODE_LENGTH).toUpperCase();
        }
        gameRepository.save(new Game(code, GAME_STATE_NOT_STARTED));

        System.out.println(payload);

        // Create the user
        User user = new User(payload.get("name").toString(), code, true, ROLE_NONE);
        userRepository.save(user);

        // Create the game state and user object
        Document responseBody = gameState.constructGameState(code, user.getToken());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping("/joinGame")
    public ResponseEntity<Document> joinGame(@RequestBody Map<String, Object> payload) {
        String code = payload.get("code").toString();

        // Check if game with this code exists
        if (gameRepository.findByCode(code) == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.NOT_FOUND);
        }

        // Create the user
        User user = new User(payload.get("name").toString(), code, false, ROLE_NONE);
        userRepository.save(user);

        // Update game state for all players
        System.out.println("send message");
        gameMessageController.sendGameState(code);

        // Create the game state and user object
        Document responseBody = gameState.constructGameState(code, user.getToken());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping("/gameState")
    public ResponseEntity<Document> gameState(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/startGame")
    public ResponseEntity<Document> startGame(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();


        // Set initial roles
        List<User> players = userRepository.findAllByGameCode(code);
        if (players.size() < 3) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }

        // Update player roles
        players.get(0).setRole(ROLE_GUESS);

        // Reader index
        int readerIndex = (int) Math.floor(players.size() / 2);
        players.get(readerIndex).setRole(ROLE_READ);

        userRepository.save(players.get(0));
        userRepository.save(players.get(readerIndex));

        // Update the game state
        game.nextRound();
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/askQuestion")
    public ResponseEntity<Document> askQuestion(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        // Add the question to the game and set the state
        game.setCurrentQuestion(payload.get("question").toString());
        game.setState(GAME_STATE_ANSWERING);
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }


    @PostMapping("/answerQuestion")
    public ResponseEntity<Document> answerQuestion(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        // Add the question to the game and set the state
        game.addAnswer(payload.get("answer").toString(), token);

        // Check if game state can advance TODO more robust check would be based on user token
        if (game.getAnswers().size() == (userRepository.findAllByGameCode(code).size() - 1)) {
            game.setState(GAME_STATE_GUESSING);
        }
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/lockInGuesses")
    public ResponseEntity<Document> lockInGuesses(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        // Record number correct for bonus
        int numberCorrect = 0;

        Map<String, Answer> answerMap = game.getAnswersHash();

        // Add results to game state
        List<Map<String, String>> answerResults = (List<Map<String, String>>) payload.get("answers");

        for (Map<String, String> answer : answerResults) {
            Answer actualAnswer = answerMap.get(answer.get("answer"));
            boolean correct = actualAnswer.getToken().equals(answer.get("guess"));
            if (correct) {
                numberCorrect += 1;
            }

            actualAnswer.setGuessedCorrectly(correct);
            game.addResult(actualAnswer);
        }

        // Calculate score
        int score = (numberCorrect * SCORE_MULTIPLIER);
        int bonus = 0;
        if (numberCorrect == answerResults.size()) {
            bonus += BONUS_SCORE;
        }

        // Update the guesser's score
        User guesser = userRepository.findByGameCodeAndRole(code, ROLE_GUESS);
        guesser.incrementScore(score + bonus);
        userRepository.save(guesser);

        // Set score and state to show results
        game.setScore(numberCorrect * SCORE_MULTIPLIER);
        game.setBonusScore(bonus);

        game.setState(GAME_STATE_RESULTS);
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/nextTurn")
    public ResponseEntity<Document> nextTurn(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        // Find guesser and reader indexes
        List<User> players = userRepository.findAllByGameCode(code);
        int guesserIndex = 0;
        int readerIndex = 0;
        for(int i = 0;i < players.size(); i++) {
            if (ROLE_GUESS.equals(players.get(i).getRole())) {
                guesserIndex = i;
            } else if (ROLE_READ.equals(players.get(i).getRole())) {
                readerIndex = i;
            }
        }

        // Advance player roles
        User prevGuesser = players.get(guesserIndex);
        User prevReader = players.get(readerIndex);
        prevGuesser.setRole(ROLE_NONE);
        prevReader.setRole(ROLE_NONE);
        int nextGuesserIndex = guesserIndex + 1;
        int nextReaderIndex = readerIndex + 1;
        if (nextGuesserIndex == players.size()) nextGuesserIndex = 0;
        if (nextReaderIndex == players.size()) nextReaderIndex = 0;
        User nextGuesser = players.get(nextGuesserIndex);
        User nextReader = players.get(nextReaderIndex);
        nextGuesser.setRole(ROLE_GUESS);
        nextReader.setRole(ROLE_READ);
        userRepository.save(prevGuesser);
        userRepository.save(prevReader);
        userRepository.save(nextGuesser);
        userRepository.save(nextReader);

        game.nextRound();
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/endGame")
    public ResponseEntity<Document> endGame(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        // Check if game with this code exists
        User currentUser = userRepository.findByToken(token);
        if (currentUser == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        Game game = gameRepository.findByCode(currentUser.getGameCode());
        if (game == null) {
            return new ResponseEntity<>(new Document(), HttpStatus.BAD_REQUEST);
        }
        String code = game.getCode();

        game.setState(GAME_STATE_FINAL_RESULTS);
        gameRepository.save(game);

        // Send the updated game state for all players
        gameMessageController.sendGameState(code);

        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }

    @PostMapping("/likeAnswer")
    public ResponseEntity<Document> likeAnswer(@RequestBody Map<String, Object> payload) {
        String token = payload.get("token").toString();

        User likedUser = userRepository.findByToken(token);
        likedUser.incrementLikes(1);
        userRepository.save(likedUser);
        return new ResponseEntity<>(new Document(), HttpStatus.OK);
    }
}
