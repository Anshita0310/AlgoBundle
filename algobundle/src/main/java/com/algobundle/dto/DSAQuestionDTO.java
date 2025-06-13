package com.algobundle.dto;

import jakarta.validation.constraints.NotBlank;

public class DSAQuestionDTO {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    private String link;

    private boolean solved;

    // Getters & Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }
}
