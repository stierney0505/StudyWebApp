package com.example.server.routes;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.entities.Flashcard;
import com.example.server.services.JwtService;
import com.example.server.services.route_services.StudyMaterialService;
import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Stream;

@RestController
@RequestMapping
public class FlashcardsRoutes extends Routes{
    StudyMaterialService studyMaterialService;

    @Autowired
    public FlashcardsRoutes(JwtService jwtService, HttpServletResponse httpServletResponse, StudyMaterialService studyMaterialService) {
        super(jwtService, httpServletResponse);
        this.studyMaterialService = studyMaterialService;
    }

    @DeleteMapping("${routes.flashcards}/{id}")
    public ResponseEntity<Response<StudyMaterialDTO>> removeFlashcardFromStudyMaterial(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue, @RequestParam String flashcardIds) throws BadRequestException {
        int[] idArray;
        try {
            idArray = Stream.of(flashcardIds.split(","))
                    .mapToInt(Integer::parseInt)
                    .toArray();
        } catch (Exception e) { throw new BadRequestException(); }

        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.removeFlashCardsFromStudyMaterial(id, userId, idArray), "FLASHCARDS_REMOVED", 200));
    }
}
