package loadedQuestions.game;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {
    Game findByCode(String code);
}
