package com.example.server.errors.study_materials;

import com.example.server.errors.CustomError;

public class FlashCardNotFoundException extends CustomError {
    private static final String DEFAULT_MESSAGE = "FLASHCARD_NOT_FOUND";
    private static final int DEFAULT_CODE = 404;

    public FlashCardNotFoundException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public FlashCardNotFoundException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public FlashCardNotFoundException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }
}
