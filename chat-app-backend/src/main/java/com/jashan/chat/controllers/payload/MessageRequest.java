package com.jashan.chat.controllers.payload;

import java.time.LocalDateTime;
import java.util.Objects;

public class MessageRequest {

    private String sender;
    private String content;
    private String roomId;
    private LocalDateTime messageTime;

    // No-argument constructor
    public MessageRequest() {
    }

    // All-argument constructor
    public MessageRequest(String sender, String content, String roomId, LocalDateTime messageTime) {
        this.sender = sender;
        this.content = content;
        this.roomId = roomId;
        this.messageTime = messageTime;
    }

    // Getter and Setter methods
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public LocalDateTime getMessageTime() {
        return messageTime;
    }

    public void setMessageTime(LocalDateTime messageTime) {
        this.messageTime = messageTime;
    }

    // toString method
    @Override
    public String toString() {
        return "MessageRequest{" +
                "sender='" + sender + '\'' +
                ", content='" + content + '\'' +
                ", roomId='" + roomId + '\'' +
                ", messageTime=" + messageTime +
                '}';
    }

    // equals method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MessageRequest that = (MessageRequest) o;
        return Objects.equals(sender, that.sender) &&
                Objects.equals(content, that.content) &&
                Objects.equals(roomId, that.roomId) &&
                Objects.equals(messageTime, that.messageTime);
    }

    // hashCode method
    @Override
    public int hashCode() {
        return Objects.hash(sender, content, roomId, messageTime);
    }
}