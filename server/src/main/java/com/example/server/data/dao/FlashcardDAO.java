package com.example.server.data.dao;

import com.example.server.data.entities.Flashcard;

import java.util.Set;

public interface FlashcardDAO {
    void save(Flashcard flashcard);
    Set<Flashcard> findFlashcardsByStudyMaterialId(int studyMaterialId);
    Flashcard getFlashcardById(int id);
}
