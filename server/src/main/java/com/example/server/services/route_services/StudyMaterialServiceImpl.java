package com.example.server.services.route_services;

import com.example.server.data.dao.FlashcardDAO;
import com.example.server.data.dao.StudyMaterialDAO;
import com.example.server.data.dao.UserDAO;
import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialInfoDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.errors.study_materials.StudyMaterialNotFoundException;
import com.example.server.errors.user.UserNotAuthorizedException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class StudyMaterialServiceImpl implements StudyMaterialService {
    private StudyMaterialDAO studyMaterialDAO;
    private FlashcardDAO flashcardDAO;
    private UserDAO userDAO;

    @Autowired
    public StudyMaterialServiceImpl(FlashcardDAO flashcardDAO, StudyMaterialDAO studyMaterialDAO, UserDAO userDAO) {
        this.flashcardDAO = flashcardDAO;
        this.userDAO = userDAO;
        this.studyMaterialDAO = studyMaterialDAO;
    }

    @Override
    public Set<StudyMaterialDTO> getUsersStudyMaterial(int userId) {
        User user = userDAO.findUserById(userId);
        return StudyMaterialDTO.createSetStudyMaterialDTO(user);
    }

    @Override
    public Set<StudyMaterialInfoDTO> getUsersBriefStudyMaterial(int userId) {
        User user = userDAO.findUserById(userId);
        return StudyMaterialDTO.createBriefStudyMaterialInfoDTO(user);
    }

    @Override
    public StudyMaterialDTO getStudyMaterialById(int id, int userId) {
//        if (studyMaterialDAO.isPrivate??? && id != userId) { stop code }
//        else {
        return new StudyMaterialDTO(studyMaterialDAO.findStudyMaterialById(id));
    }

    @Override
    public StudyMaterialDTO createStudyMaterial(@Valid StudyMaterial studyMaterial, int userId) {
        studyMaterial.setUserId(userId);
        return new StudyMaterialDTO(studyMaterialDAO.save(studyMaterial, userDAO.findUserById(userId)));
    }

    @Override
    public StudyMaterialDTO updateStudyMaterial(StudyMaterialDTO studyMaterialDTO, int studyMaterialId, int userId) {
        StudyMaterial data = studyMaterialDAO.findStudyMaterialById(studyMaterialId);
        if (data != null && data.getUserId() == userId) {
            StudyMaterial sm = studyMaterialDAO.updateStudyMaterial(data, studyMaterialDTO);
            return new StudyMaterialDTO(sm);
        } else { throw new UserNotAuthorizedException("User does not have permission to update this study material");}
    }

    @Override
    public void deleteStudyMaterial(int studyMaterialId, int userId) {
        StudyMaterial data = studyMaterialDAO.findStudyMaterialById(studyMaterialId);
        if (data == null) { throw new StudyMaterialNotFoundException(); }
        if (data.getUserId() != userId) { throw new UserNotAuthorizedException("User does not have permission to delete this study material"); }
        studyMaterialDAO.deleteStudyMaterial(data, userId);
    }

    @Override
    public StudyMaterialDTO removeFlashCardsFromStudyMaterial(int studyMaterialId, int userId, int[] idArray) {
        StudyMaterial data = studyMaterialDAO.findStudyMaterialById(studyMaterialId);
        if (data == null) { throw new StudyMaterialNotFoundException(); }
        if (data.getUserId() != userId) { throw new UserNotAuthorizedException("User does not have permission to delete flashcards from this set"); }
        return new StudyMaterialDTO(studyMaterialDAO.removeFlashcardsFromStudyMaterial(idArray, data));
    }


}
