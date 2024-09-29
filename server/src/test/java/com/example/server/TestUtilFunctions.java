package com.example.server;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialInfoDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.services.JwtService;
import com.example.server.data.dto.JwtUser;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class TestUtilFunctions {
    @Value("${jwt.access.name}")
    private String accessTokenName;

    @Autowired
    private JwtService jwtService;

    private static int flashCardId = 1;

    // Utility method to set JWT cookie
    public Cookie getJwtCookie(String email, int id) throws Exception {
        return new Cookie(accessTokenName, jwtService.generateToken(new JwtUser(email, id)));
    }

    public Set<Flashcard> createXFlashcards(int x) {
        Set<Flashcard> flashcards = new HashSet<>();
        for (int i = 1; i < x + 1; i++) {
            Flashcard flashcard = new Flashcard("Question " + i, "Answer " + i);
            flashcard.setId(flashCardId++);
            flashcards.add(flashcard);
        }
        return flashcards;
    }

    public Set<StudyMaterialDTO> createStudyMaterialSet(int numStudyMaterials, int[] flashcardLengths, User user) {

        Set<StudyMaterialDTO> returnStudyMaterials = new HashSet<>();

        for (int i = 1; i < numStudyMaterials + 1; i++) {
            StudyMaterial studyMaterial = new StudyMaterial("Description " + i, "Name " + i, user.getId());
            studyMaterial.setFlashcards(createXFlashcards(flashcardLengths[(i - 1) % flashcardLengths.length]));
            studyMaterial.addUser(user);
            studyMaterial.setId(i);
            returnStudyMaterials.add(new StudyMaterialDTO(studyMaterial));
        }

        return returnStudyMaterials;
    }

    public Set<StudyMaterialInfoDTO> createBriefStudyMaterialSet(int numStudyMaterials, User user) {

        Set<StudyMaterialInfoDTO> returnStudyMaterials = new HashSet<>();

        for (int i = 1; i < numStudyMaterials + 1; i++) {
            StudyMaterial studyMaterial = new StudyMaterial("Description " + i, "Name " + i, user.getId());
            studyMaterial.addUser(user);
            studyMaterial.setId(i);
            returnStudyMaterials.add(new StudyMaterialInfoDTO(studyMaterial));
        }

        return returnStudyMaterials;
    }

}
