package com.example.server;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialInfoDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.data.entities.User;
import com.example.server.services.route_services.StudyMaterialService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashSet;
import java.util.Set;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class StudyMaterialRoutesTest {
    @Value("${routes.studymaterial}")
    private String studyMaterialEndPoint;

    @Value("${routes.flashcards}")
    private String flashcardsEndPoint;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestUtilFunctions utilFunctions;

    @MockBean
    private StudyMaterialService studyMaterialService;

    @Autowired
    private TestUtilFunctions testUtilFunctions;

    private final ObjectMapper Obj = new ObjectMapper();

    @Test
    public void getStudyMaterialByIdTest() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        StudyMaterial returnStudyMaterial = new StudyMaterial("Description", "Name", 1);
        returnStudyMaterial.setFlashcards(testUtilFunctions.createXFlashcards(3));
        returnStudyMaterial.addUser(testUser);
        returnStudyMaterial.setId(1);

        when(studyMaterialService.getStudyMaterialById(1, 1)).thenReturn(new StudyMaterialDTO(returnStudyMaterial));

        mockMvc.perform(get(studyMaterialEndPoint + "/1")
                .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId())))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.owner_id").value(1))
                .andExpect(jsonPath("$.data.name").exists())
                .andExpect(jsonPath("$.data.description").exists())
                .andExpect(jsonPath("$.data.flashcards.length()").value(3))
                .andExpect(jsonPath("$.data.flashcards[0].question").value("Question 1"))
                .andExpect(jsonPath("$.data.name").value("Name"))
                .andExpect(jsonPath("$.data.description").value("Description"));
    }

    @Test
    public void getStudyMaterials() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        int[] flashcardLengths = {2, 5};
        Set<StudyMaterialDTO> returnStudyMaterials = testUtilFunctions.createStudyMaterialSet(2, flashcardLengths, testUser); new HashSet<>();

        when(studyMaterialService.getUsersStudyMaterial(1)).thenReturn(returnStudyMaterials);

        mockMvc.perform(get(studyMaterialEndPoint)
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId())))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].owner_id").value(1))
                .andExpect(jsonPath("$.data[0].name").exists())
                .andExpect(jsonPath("$.data[0].description").exists())
                .andExpect(jsonPath("$.data[0].flashcards.length()").value(2))
                .andExpect(jsonPath("$.data[1].flashcards.length()").value(5))
                .andExpect(jsonPath("$.data[1].flashcards[4].question").value("Question 5"))
                .andExpect(jsonPath("$.data[1].flashcards[0].question").value("Question 1"));
    }

    @Test
    public void getBriefStudyMaterials() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        Set<StudyMaterialInfoDTO> returnStudyMaterials = testUtilFunctions.createBriefStudyMaterialSet(2, testUser); new HashSet<>();

        when(studyMaterialService.getUsersBriefStudyMaterial(1)).thenReturn(returnStudyMaterials);

        mockMvc.perform(get(studyMaterialEndPoint + "/overview")
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId())))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].owner_id").doesNotExist())
                .andExpect(jsonPath("$.data[0].name").doesNotExist())
                .andExpect(jsonPath("$.data[0].description").doesNotExist())
                .andExpect(jsonPath("$.data[0].flashcards").doesNotExist())
                .andExpect(jsonPath("$.data[1].flashcards").doesNotExist())
                .andExpect(jsonPath("$.data[1].title").exists());
    }

    @Test
    public void createStudyMaterialTest() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        StudyMaterial returnStudyMaterial = new StudyMaterial("Description", "Name", 1);
        returnStudyMaterial.setId(1);
        returnStudyMaterial.setFlashcards(testUtilFunctions.createXFlashcards(3));
        returnStudyMaterial.addUser(testUser);

        when(studyMaterialService.createStudyMaterial(returnStudyMaterial, 1)).thenReturn(new StudyMaterialDTO(returnStudyMaterial));

        mockMvc.perform(post(studyMaterialEndPoint)
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId()))
                        .contentType("application/json")
                        .content(Obj.writeValueAsString(returnStudyMaterial)))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.owner_id").value(1))
                .andExpect(jsonPath("$.data.name").exists())
                .andExpect(jsonPath("$.data.description").exists())
                .andExpect(jsonPath("$.data.flashcards.length()").value(3))
                .andExpect(jsonPath("$.data.flashcards[0].question").value("Question 1"))
                .andExpect(jsonPath("$.data.name").value("Name"))
                .andExpect(jsonPath("$.data.description").value("Description")
        );
    }

    @Test
    public void updateStudyMaterialTest() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        StudyMaterial updateStudyMaterial = new StudyMaterial("Description", "Name", 1);
        updateStudyMaterial.setId(1);
        updateStudyMaterial.setFlashcards(testUtilFunctions.createXFlashcards(3));
        updateStudyMaterial.addUser(testUser);

        when(studyMaterialService.updateStudyMaterial(new StudyMaterialDTO(updateStudyMaterial), 1, 1)).thenReturn(new StudyMaterialDTO(updateStudyMaterial));

        mockMvc.perform(put(studyMaterialEndPoint + "/1")
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId()))
                        .contentType("application/json")
                        .content(Obj.writeValueAsString(updateStudyMaterial)))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.owner_id").value(1))
                .andExpect(jsonPath("$.data.name").exists())
                .andExpect(jsonPath("$.data.description").exists())
                .andExpect(jsonPath("$.data.flashcards.length()").value(3))
                .andExpect(jsonPath("$.data.flashcards[0].question").value("Question 1"))
                .andExpect(jsonPath("$.data.name").value("Name"))
                .andExpect(jsonPath("$.data.description").value("Description")
                );
    }

    @Test
    public void deleteStudyMaterialTest() throws Exception {
        doNothing().when(studyMaterialService).deleteStudyMaterial(1,1);

        mockMvc.perform(delete(studyMaterialEndPoint + "/1")
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", 1))
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.message").value("STUDY_MATERIAL_DELETED")
                );
    }

    @Test
    public void deleteFlashcardFromStudyMaterialTest() throws Exception {
        User testUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
        testUser.setId(1);

        StudyMaterial provideStudyMaterial = new StudyMaterial("Description", "Name", 1);
        provideStudyMaterial.setId(1);
        provideStudyMaterial.setFlashcards(testUtilFunctions.createXFlashcards(3));
        provideStudyMaterial.addUser(testUser);
        int[] tempArr = {1};

        StudyMaterial returnStudyMaterial = new StudyMaterial("Description", "Name", 1);
        returnStudyMaterial.setId(1);
        returnStudyMaterial.addUser(testUser);
        returnStudyMaterial.setFlashcards(testUtilFunctions.createXFlashcards(2));

        when(studyMaterialService.removeFlashCardsFromStudyMaterial(3,1, tempArr)).thenReturn(new StudyMaterialDTO(returnStudyMaterial));

        mockMvc.perform(delete(flashcardsEndPoint + "/3")
                        .cookie(utilFunctions.getJwtCookie("bjones@gmail.com", testUser.getId()))
                        .contentType("application/json")
                        .param("flashcardIds", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.owner_id").value(1))
                .andExpect(jsonPath("$.data.name").exists())
                .andExpect(jsonPath("$.data.description").exists())
                .andExpect(jsonPath("$.data.flashcards[0].id").exists())
                .andExpect(jsonPath("$.data.flashcards[1].id").exists())
                .andExpect(jsonPath("$.data.flashcards[0].question").value("Question 1"))
                .andExpect(jsonPath("$.data.flashcards[1].answer").value("Answer 2"))
                .andExpect(jsonPath("$.data.flashcards.length()").value(2)
                );
    }
}
