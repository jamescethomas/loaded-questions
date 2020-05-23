package loadedQuestions.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
public class GameMessageController {
    @Autowired private GameState gameState;
    @Autowired private SimpMessagingTemplate template;

    public void sendGameState(String code) {
        System.out.println("Fire");
        this.template.convertAndSend("/topic/greetings/" + code, gameState.constructPlayerlessGameSTate(code));
    }
}
