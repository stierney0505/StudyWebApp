package com.example.server.errors.study_materials;

import com.example.server.errors.CustomError;

public class StudyMaterialNotFoundException extends CustomError {
    private static final String DEFAULT_MESSAGE = "STUDY_MATERIAL_NOT_FOUND";
    private static final int DEFAULT_CODE = 404;

    public StudyMaterialNotFoundException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public StudyMaterialNotFoundException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public StudyMaterialNotFoundException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }
}
