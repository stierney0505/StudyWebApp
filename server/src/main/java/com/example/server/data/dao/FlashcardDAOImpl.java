package com.example.server.data.dao;

import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.errors.CustomError;
import com.example.server.errors.generic.ServerErrorException;
import com.example.server.errors.study_materials.StudyMaterialNotFoundException;
import com.example.server.errors.user.UserNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public class FlashcardDAOImpl implements FlashcardDAO {
    private EntityManager em;

    @Autowired
    public FlashcardDAOImpl(EntityManager em) { this.em = em; }

    @Override
    @Transactional
    public void save(Flashcard flashcard) {
        try {
            em.merge(flashcard);

            if(flashcard.getStudyMaterials() != null && !flashcard.getStudyMaterials().isEmpty()) {
                for (StudyMaterial studyMaterial : flashcard.getStudyMaterials()) {
                    studyMaterial.getFlashcards().add(flashcard);
                    em.merge(studyMaterial);
                }
            }
        } catch (Exception e) {
            throw new ServerErrorException();
        }
    }

    @Override
    public Set<Flashcard> findFlashcardsByStudyMaterialId(int studyMaterialId) {
        try {
            // Uses parameters so should be safe from SQL injection
            String preparedQueryString = "from Flashcard where id = :id";
            TypedQuery<Flashcard> preparedQuery = em.createQuery(preparedQueryString, Flashcard.class)
                    .setParameter("id", studyMaterialId);
            List<Flashcard> flashcards = preparedQuery.getResultList();
            return Set.copyOf(flashcards);
        } catch (Exception e) {
            if (e instanceof CustomError) { throw e; }
            throw new ServerErrorException();
        }
    }

    @Override
    public Flashcard getFlashcardById(int id) {
        Flashcard flashcard = em.find(Flashcard.class, id);
        if (flashcard == null) { throw new StudyMaterialNotFoundException("Flashcard not found."); }
        return flashcard;
    }


}
