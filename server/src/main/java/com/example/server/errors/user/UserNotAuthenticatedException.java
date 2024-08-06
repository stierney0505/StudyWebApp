package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserNotAuthenticatedException extends CustomError {
    private static final String DEFAULT_MESSAGE = "USER_NOT_AUTHENTICATED";
    private static final int DEFAULT_CODE = 401;

    private int userId;

    public UserNotAuthenticatedException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public UserNotAuthenticatedException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public UserNotAuthenticatedException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }

    public UserNotAuthenticatedException(String message, int id) { super(message, id); }
}
