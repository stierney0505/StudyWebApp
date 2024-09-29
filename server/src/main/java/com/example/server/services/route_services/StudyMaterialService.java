package com.example.server.services.route_services;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialInfoDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;

import java.util.Set;

public interface StudyMaterialService {
    Set<StudyMaterialDTO> getUsersStudyMaterial(int userId);
    Set<StudyMaterialInfoDTO> getUsersBriefStudyMaterial(int userId);
    StudyMaterialDTO getStudyMaterialById(int id, int userId);
    StudyMaterialDTO createStudyMaterial(StudyMaterial studyMaterial, int userId);
    StudyMaterialDTO updateStudyMaterial(StudyMaterialDTO studyMaterial, int studyMaterialId, int userId);
    void deleteStudyMaterial(int studyMaterialId, int userId);
    StudyMaterialDTO removeFlashCardsFromStudyMaterial(int studyMaterialId, int userId, int[] idArray);
}
