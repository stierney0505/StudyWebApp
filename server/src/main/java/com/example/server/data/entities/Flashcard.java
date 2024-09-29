package com.example.server.data.entities;


import com.example.server.data.dto.studymaterials.FlashcardDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="flashcards")
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="question")
    private String question;

    @Column(name="answer")
    private String answer;

    @ManyToMany(mappedBy = "flashcards")
    Set<StudyMaterial> StudyMaterials = new HashSet<StudyMaterial>();

    public Flashcard(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public Flashcard(FlashcardDTO flashcardDTO) {
        this.question = flashcardDTO.getQuestion();
        this.answer = flashcardDTO.getAnswer();
        this.id = flashcardDTO.getId();
    }

    @JsonCreator
    public Flashcard() {}

    public Integer getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getQuestion() {return question;}

    public void setQuestion(String key) {this.question = key;}

    public String getAnswer() {return answer;}

    public void setAnswer(String value) {this.answer = value;}

    public Set<StudyMaterial> getStudyMaterials() {return StudyMaterials;}

    public void setStudyMaterials(Set<StudyMaterial> studyMaterials) {StudyMaterials = studyMaterials;}

    public void addStudyMaterial(StudyMaterial studyMaterial) { StudyMaterials.add(studyMaterial); }

    public void setId(Integer id) {this.id = id;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Flashcard)) return false;
        Flashcard flashcard = (Flashcard) o;
        return Objects.equals(question, flashcard.question) &&
                Objects.equals(answer, flashcard.answer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(question, answer);
    }
}
