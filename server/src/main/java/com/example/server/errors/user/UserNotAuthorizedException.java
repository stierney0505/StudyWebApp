package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserNotAuthorizedException extends CustomError {
    private static final String DEFAULT_MESSAGE = "USER_NOT_AUTHORIZED";
    private static final int DEFAULT_CODE = 403;

    private int userId;

    public UserNotAuthorizedException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public UserNotAuthorizedException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public UserNotAuthorizedException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }

    public UserNotAuthorizedException(String message, int id) { super(message, id); }
}
