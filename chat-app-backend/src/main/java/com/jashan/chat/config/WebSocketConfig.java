package com.jashan.chat.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:5173").withSockJS(); //first handshake is on this point or this is where the connection establishes
    }
    //configures the message broker it is a intermediatery that routes the message
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //it enables a in memory message broker and any message will be published to the /topic prefixed endpoint
        // /topic/messages correct if /text/messages will not be there
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
        //server-side : @MessageMapping("/chat")
    }
}