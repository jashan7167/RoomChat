package com.jashan.chat.controllers;


import com.jashan.chat.controllers.payload.MessageRequest;
import com.jashan.chat.entities.Message;
import com.jashan.chat.entities.Room;
import com.jashan.chat.repositories.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository)
    {
        this.roomRepository = roomRepository;
    }


    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request)
    {
        Room room = roomRepository.findByRoomId(roomId);
        Message message = new Message();
        message.setSender(request.getSender());
        message.setContent(request.getContent());
        message.setTime(LocalDateTime.now());
        room.addMessage(message);
        roomRepository.save(room);
        System.out.println(message);
        return message;
    }
}
