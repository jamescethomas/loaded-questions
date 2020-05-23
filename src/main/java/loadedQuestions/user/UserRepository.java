package loadedQuestions.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Class used to interact with the user collection
 */
public interface UserRepository extends MongoRepository<User, String> {
    /**
     * Find a user in the database, in this case mongodb, by email address
     *
     * @return a user object
     */
    User findByName(String name);

    User findByToken(String token);

    User findByGameCodeAndRole(String gameCode, String role);

    List<User> findAllByGameCode(String gameCode);
}