package com.jashan.chat.entities;

import java.time.LocalDateTime;
import java.util.Objects;

public class Message {

    private String sender;
    private String content;
    private LocalDateTime time;

    // No-argument constructor
    public Message() {
    }

    // All-argument constructor
    public Message(String sender, String content, LocalDateTime time) {
        this.sender = sender;
        this.content = content;
        this.time = time;
    }

    // Constructor with automatic time setting
    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.time = LocalDateTime.now(); // Automatically sets the current time
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

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    // toString method
    @Override
    public String toString() {
        return "Message{" +
                "sender='" + sender + '\'' +
                ", content='" + content + '\'' +
                ", time=" + time +
                '}';
    }

    // equals method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(sender, message.sender) &&
                Objects.equals(content, message.content) &&
                Objects.equals(time, message.time);
    }

    // hashCode method
    @Override
    public int hashCode() {
        return Objects.hash(sender, content, time);
    }
}