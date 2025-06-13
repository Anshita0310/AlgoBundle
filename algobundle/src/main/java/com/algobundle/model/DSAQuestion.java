package com.algobundle.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;  // For Jakarta validation

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DSAQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @Column(columnDefinition = "Text")
    @Size(max = 500, message = "Description too long")
    private String description;

    private String topic;
    private String difficulty;
    private String link;
    private boolean solved;
    @Column(nullable = false)
    private String status; // Status: "SOLVED", "ATTEMPTED", "UNSOLVED"

    @PrePersist
    private void prePersist() {
        if (status == null) {
            status = "UNSOLVED";
        }
    }

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
        this.status = solved ? "SOLVED" : "UNSOLVED";
    }

    public void setStatus(String status) {
        this.status = status;
        this.solved = "SOLVED".equalsIgnoreCase(status);
    }
}
