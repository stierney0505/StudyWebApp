package com.example.server.data.dao;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;

import java.util.Set;

public interface StudyMaterialDAO {
    StudyMaterial save(StudyMaterial studyMaterial, User user);
    void addFlashCardsToStudyMaterial(Flashcard[] flashcards, StudyMaterial studyMaterial);
    StudyMaterial removeFlashcardsFromStudyMaterial(int[] idArray, StudyMaterial studyMaterial);
    Set<Flashcard> getFlashcardsFromStudyMaterial(StudyMaterial studyMaterial);
    void removeFlashCardFromStudyMaterial(Flashcard flashcard, StudyMaterial studyMaterial);
    StudyMaterial findStudyMaterialById(int id);
    Set<StudyMaterial> getUsersStudyMaterial(User user);
    StudyMaterial updateStudyMaterial(StudyMaterial studyMaterial, StudyMaterialDTO studyMaterialDTO);
    void deleteStudyMaterial(StudyMaterial studyMaterial, int userId);
}
