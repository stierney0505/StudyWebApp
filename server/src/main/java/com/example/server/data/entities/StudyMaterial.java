package com.example.server.data.entities;

import com.example.server.data.dto.studymaterials.FlashcardDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "study_material")
public class StudyMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "name")
    @Length(min = 3, max = 50)
    private String name;

    @Column(name = "description")
    @Length(min = 3, max = 250)
    private String description;
    //Study materials "own" the flashcards, so they are the ones with the cascading operations
    @ManyToMany(cascade={CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "study_material_flashcards_join",
            joinColumns = @JoinColumn(name = "study_material_id"),
            inverseJoinColumns = @JoinColumn(name = "flashcard_id")
    )
    private Set<Flashcard> flashcards = new HashSet<Flashcard>();

    @ManyToMany(mappedBy = "studyMaterials", cascade={CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    Set<User> Users = new HashSet<User>();

    public StudyMaterial(String description, String name, int userId) {
        this.description = description;
        this.name = name;
        this.userId = userId;
    }

    public StudyMaterial(String description, String name) {
        this.description = description;
        this.name = name;
    }

    @JsonCreator
    public StudyMaterial() {}

    public Integer getUserId() {return userId;}

    public void setUserId(int userId) {this.userId = userId;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public Integer getId() {return id;}

    public void setId(int id) {this.id = id;}

    public Set<Flashcard> getFlashcards() {return flashcards;}

    public void setFlashcards(Set<Flashcard> flashcards) {this.flashcards = flashcards;}

    public Set<User> getUsers() {return Users;}

    public void setUsers(Set<User> users) {Users = users;}

    public void setUserId(Integer userId) {this.userId = userId;}

    public void setId(@NotNull Integer id) {this.id = id;}

    public void addUser(User user) {
        this.Users.add(user);
        user.getStudyMaterials().add(this); // Add this studyMaterial to the user's studyMaterials
    }

    public void removeUser(User user) {
        this.Users.remove(user);
        user.getStudyMaterials().remove(this); // Remove this studyMaterial from the user's studyMaterials
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudyMaterial studyMaterial)) return false;
        return Objects.equals(this.id, studyMaterial.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
