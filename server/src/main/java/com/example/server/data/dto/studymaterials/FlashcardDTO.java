package com.example.server.data.dto.studymaterials;

import com.example.server.data.entities.Flashcard;

public class FlashcardDTO {
    private Integer id;
    private String question;
    private String answer;

    public FlashcardDTO(Flashcard flashcard) {
        this.id = flashcard.getId();
        this.question = flashcard.getQuestion();
        this.answer = flashcard.getAnswer();
    }

    public FlashcardDTO() {}

    public Integer getId() {return id;}

    public void setId(int id) {this.id = id;}

    public void setId(Integer id) {this.id = id;}

    public String getQuestion() {return question;}

    public void setQuestion(String question) {this.question = question;}

    public String getAnswer() {return answer;}

    public void setAnswer(String answer) {this.answer = answer;}
}
