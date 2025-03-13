package com.jashan.chat.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
public class Room {

    @Id
    private String id; // MongoDB unique identifier
    private String roomId;
    private List<Message> message = new ArrayList<>();

    // No-args constructor
    public Room() {
    }

    // All-args constructor
    public Room(String id, String roomId, List<Message> message) {
        this.id = id;
        this.roomId = roomId;
        this.message = message;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public List<Message> getMessage() {
        return message;
    }

    public void addMessage(Message message) {
        this.message.add(message);
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", roomId='" + roomId + '\'' +
                ", message=" + message +
                '}';
    }
}
