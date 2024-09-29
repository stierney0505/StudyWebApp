package com.example.server.data.dao;

import com.example.server.data.dto.studymaterials.FlashcardDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.errors.CustomError;
import com.example.server.errors.generic.BadRequest;
import com.example.server.errors.generic.ServerErrorException;
import com.example.server.errors.study_materials.FlashCardNotFoundException;
import com.example.server.errors.study_materials.StudyMaterialNotFoundException;
import com.example.server.errors.user.UserNotAuthorizedException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Repository
public class StudyMaterialDAOImpl implements StudyMaterialDAO {
    private EntityManager em;

    @Autowired
    public StudyMaterialDAOImpl(EntityManager em) { this.em = em; }

    @Override
    @Transactional
    public StudyMaterial save(StudyMaterial studyMaterial, User user) {
        if(studyMaterial == null) { throw new StudyMaterialNotFoundException(); }

        try {
            if (studyMaterial.getFlashcards() != null && !studyMaterial.getFlashcards().isEmpty()) {
                for (Flashcard flashcard : studyMaterial.getFlashcards()) {
                    flashcard.addStudyMaterial(studyMaterial);
                }
            }
            user.addStudyMaterial(studyMaterial);
            studyMaterial.addUser(user);

            return em.merge(studyMaterial);
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

//    @Override
//    @Transactional
//    public void addFlashCardToStudyMaterial(Flashcard flashcard, StudyMaterial studyMaterial) {
//        if(studyMaterial == null) { throw new StudyMaterialNotFoundException(); }
//        else if (flashcard == null) { throw new StudyMaterialNotFoundException("Flashcard record not found."); }
//
//        try {
//            studyMaterial.getFlashcards().add(flashcard);
//            em.merge(studyMaterial);
//        } catch (Exception e) {
//            throw new ServerErrorException();
//        }
//    }

    @Override
    @Transactional
    public void addFlashCardsToStudyMaterial(Flashcard[] flashcards, StudyMaterial studyMaterial) {
        if(studyMaterial == null) { throw new StudyMaterialNotFoundException(); }
        else if (flashcards == null) { throw new FlashCardNotFoundException("Flashcards record not found."); }

        try {
            Collections.addAll(studyMaterial.getFlashcards(), flashcards);
            em.merge(studyMaterial);
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

    @Override
    @Transactional
    public StudyMaterial removeFlashcardsFromStudyMaterial(int[] idArray, StudyMaterial studyMaterial) {    if (studyMaterial == null) {
        throw new StudyMaterialNotFoundException();
    }
        if (idArray == null) {
            throw new FlashCardNotFoundException();
        }

        try {
            Set<Flashcard> existingFlashcards = studyMaterial.getFlashcards();
            existingFlashcards.removeIf(flashcard -> Arrays.stream(idArray).anyMatch(id -> flashcard.getId() == id));
            return em.merge(studyMaterial);
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

    @Override
    public Set<Flashcard> getFlashcardsFromStudyMaterial(StudyMaterial studyMaterial) {
        if(studyMaterial == null) { throw new StudyMaterialNotFoundException(); }

        try {
            Set<Flashcard> returnFlashcards = studyMaterial.getFlashcards();

            return studyMaterial.getFlashcards();
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

    @Override
    @Transactional
    public void removeFlashCardFromStudyMaterial(Flashcard flashcard, StudyMaterial studyMaterial) {
        if (studyMaterial == null) { throw new StudyMaterialNotFoundException(); }
        else if (flashcard == null) { throw new FlashCardNotFoundException("Flashcard record not found."); }

        try {
            Set<Flashcard> flashcardsReference = studyMaterial.getFlashcards();
            int flashcardLength = flashcardsReference.size();
            flashcardsReference.remove(flashcard);
            int newFlashcardLength = flashcardsReference.size();

            // If flashcard isn't removed, i.e. flashcard not in the study set
            if(newFlashcardLength == flashcardLength) { throw new BadRequest("Flashcard cannot be removed from study " +
                    "material as it does not exist in the study material."); }

            em.merge(studyMaterial);
        } catch (Exception e) {
            if (e instanceof CustomError) { throw e; }
            throw new ServerErrorException();
        }
    }

    @Override
    public StudyMaterial findStudyMaterialById(int id) {
        StudyMaterial material = em.find(StudyMaterial.class, id);
        if (material == null) { throw new StudyMaterialNotFoundException("Study material not found."); }
        return material;
    }

    @Override
    public Set<StudyMaterial> getUsersStudyMaterial(User user) {
        Set<StudyMaterial> materials = user.getStudyMaterials();
        if (materials == null) { throw new StudyMaterialNotFoundException("No study materials associated with user."); }
        return materials;
    }


    @Override
    @Transactional
    public StudyMaterial updateStudyMaterial(StudyMaterial studyMaterial, StudyMaterialDTO studyMaterialDTO) {
        if (studyMaterial == null) {
            throw new StudyMaterialNotFoundException();
        }

        try {
            // Update fields that are not null in the DTO
            if (studyMaterialDTO.getName() != null) {
                studyMaterial.setName(studyMaterialDTO.getName());
            }
            if (studyMaterialDTO.getDescription() != null) {
                studyMaterial.setDescription(studyMaterialDTO.getDescription());
            }

            Set<Flashcard> updatedFlashcards = new HashSet<>();
            if (studyMaterialDTO.getFlashcards() != null) {
                Set<Flashcard> existingFlashcards = studyMaterial.getFlashcards();

                for (FlashcardDTO flashcardDTO : studyMaterialDTO.getFlashcards()) {
                    Flashcard flashcard = null;
                    if(flashcardDTO.getId() != null) { flashcard = em.find(Flashcard.class, flashcardDTO.getId()); }

                    if (flashcard == null) {
                        flashcard = new Flashcard(flashcardDTO);
                    } else {
                        if (flashcardDTO.getQuestion() != null) {
                            flashcard.setQuestion(flashcardDTO.getQuestion());
                        }
                        if (flashcardDTO.getAnswer() != null) {
                            flashcard.setAnswer(flashcardDTO.getAnswer());
                        }
                    }
                    updatedFlashcards.add(flashcard);
                    em.merge(flashcard);
                }
                existingFlashcards.clear();
                existingFlashcards.addAll(updatedFlashcards);
                studyMaterial.setFlashcards(updatedFlashcards);
            }

            return em.merge(studyMaterial);
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

    @Override
    @Transactional
    public void deleteStudyMaterial(StudyMaterial studyMaterial, int userId) {
        if (studyMaterial == null) {
            throw new StudyMaterialNotFoundException();
        }
        if (studyMaterial.getUserId() != userId) {
            throw new UserNotAuthorizedException("User is not authorized to delete study material.");
        }

        for (User user : studyMaterial.getUsers()) {
            user.getStudyMaterials().remove(studyMaterial);
        }
        for (Flashcard flashcard : studyMaterial.getFlashcards()) {
            flashcard.getStudyMaterials().remove(studyMaterial);
        }

        em.remove(em.contains(studyMaterial) ? studyMaterial : em.merge(studyMaterial));
    }

}
