package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserExistsException extends CustomError {
    private static final String DEFAULT_MESSAGE = "USER_ALREADY_EXISTS";
    private static final int DEFAULT_CODE = 400;

    public UserExistsException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }

    public UserExistsException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public UserExistsException(String message, String detailedMessage, int errorCode) { super(message, detailedMessage, errorCode); }

    public UserExistsException(String message, int errorCode) { super(message, errorCode); }
}
