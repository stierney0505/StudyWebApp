package com.example.server.routes;

import com.example.server.data.dao.FlashcardDAO;
import com.example.server.data.dao.StudyMaterialDAO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.services.JwtService;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class TestRoutes extends Routes {
    @Autowired
    FlashcardDAO flashcardDAO;

    @Autowired
    StudyMaterialDAO studyMaterialDAO;

    @Autowired
    EntityManager em;

    @Autowired
    public TestRoutes(JwtService jwtService, HttpServletResponse httpServletResponse) {
        super(jwtService, httpServletResponse);
    }

    @GetMapping("/flashCardCreateTest")
    public String flashCardCreateTest() {
        StudyMaterial testMaterial = new StudyMaterial("description",  "name", 1);
        Flashcard test = new Flashcard("question", "answer");
        test.getStudyMaterials().add(testMaterial);

        flashcardDAO.save(test);
        return "Success";
    }


    @GetMapping("/addFlashCardToStudyMaterial")
    public String addFlashCardToStudyMaterial() {
//Adds flashcard to study material
//        StudyMaterial testMaterial = em.find(StudyMaterial.class, 1);
//        Flashcard test = new Flashcard("2question2", "1answer1");
//        studyMaterialDAO.addFlashCardToStudyMaterial(test, testMaterial);

        Flashcard test = flashcardDAO.getFlashcardById(6);
        StudyMaterial testMaterial = studyMaterialDAO.findStudyMaterialById(1);
        studyMaterialDAO.removeFlashCardFromStudyMaterial(test, testMaterial);

        return "Success";
    }

}
