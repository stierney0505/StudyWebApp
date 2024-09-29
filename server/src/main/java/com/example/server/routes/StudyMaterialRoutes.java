package com.example.server.routes;

import com.example.server.data.dto.studymaterials.StudyMaterialDTO;
import com.example.server.data.dto.studymaterials.StudyMaterialInfoDTO;
import com.example.server.data.entities.StudyMaterial;
import com.example.server.services.JwtService;
import com.example.server.services.route_services.StudyMaterialService;
import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping
public class StudyMaterialRoutes extends Routes{
    StudyMaterialService studyMaterialService;

    @Autowired
    public StudyMaterialRoutes(JwtService jwtService, HttpServletResponse httpServletResponse, StudyMaterialService studyMaterialService) {
        super(jwtService, httpServletResponse);
        this.studyMaterialService = studyMaterialService;
    }

    @GetMapping("${routes.studymaterial}")
    public ResponseEntity<Response<Set<StudyMaterialDTO>>> getUsersStudyMaterial(@CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.getUsersStudyMaterial(userId), "STUDY_MATERIAL_FOUND",200));
    }

    @GetMapping("${routes.studymaterial}/overview")
    public ResponseEntity<Response<Set<StudyMaterialInfoDTO>>> getBriefUsersStudyMaterial(@CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.getUsersBriefStudyMaterial(userId), "STUDY_MATERIAL_OVERVIEW_FOUND", 200));
    }

    @GetMapping("${routes.studymaterial}/{id}")
    public ResponseEntity<Response<StudyMaterialDTO>> getStudyMaterialById(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.getStudyMaterialById(id, userId), "STUDY_MATERIAL_FOUND", 200));
    }

    @PostMapping(value="${routes.studymaterial}") //TODO : USE PROCEDURE TO CREATE STUDY MATERIAL WITH TAGS!
    public ResponseEntity<Response<StudyMaterialDTO>> createStudyMaterial(@Valid @RequestBody StudyMaterial studyMaterial, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.createStudyMaterial(studyMaterial, userId), "STUDY_MATERIAL_CREATED", 200));
    }

    @PutMapping("${routes.studymaterial}/{id}")
    public ResponseEntity<Response<StudyMaterialDTO>> updateStudyMaterial(@RequestBody StudyMaterialDTO studyMaterial, @PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(
                studyMaterialService.updateStudyMaterial(studyMaterial, id, userId), "STUDY_MATERIAL_UPDATED", 200));
    }

    @DeleteMapping("${routes.studymaterial}/{id}")
    public ResponseEntity<Response<Object>> deleteStudyMaterial(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        int userId = getIdFromToken(tokenValue);

        studyMaterialService.deleteStudyMaterial(id, userId);
        return ResponseGenerator.CreateSuccessResponse(new Response<>(null, "STUDY_MATERIAL_DELETED", 200));
    }
}
