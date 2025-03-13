package com.jashan.chat.controllers;


import com.jashan.chat.entities.Message;
import com.jashan.chat.entities.Room;
import com.jashan.chat.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody Room room)
    {
        if(roomRepository.findByRoomId(room.getRoomId()) != null){
            return ResponseEntity.badRequest().body("Room already exists");
        }

        roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }


    //get room: join
    @GetMapping("/{roomId}")
    public ResponseEntity<?>joinRoom(@PathVariable String roomId)
    {
        Room room = roomRepository.findByRoomId(roomId);
        if(room != null){
            return ResponseEntity.status(HttpStatus.OK).body(room);
        }
        else
        {
            System.out.println("Room not found");
            return ResponseEntity.notFound().build();
        }
    }
    //get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,@RequestParam(value="page",defaultValue = "0",required = false) int page,@RequestParam(value = "size",defaultValue = "20",required = false) int size)
    {
        Room room = roomRepository.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.notFound().build();
        }
        //get messages:
        //pagination
        List<Message> messages = room.getMessage();
        int start = Math.max(0,messages.size() - (page+1) * size);
        int end = Math.min(start + size, messages.size());
        List<Message> paginatedMessages = messages.subList(start, end);
        return ResponseEntity.status(HttpStatus.OK).body(messages);
    }

}
