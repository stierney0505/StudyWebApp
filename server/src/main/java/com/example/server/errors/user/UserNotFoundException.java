package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserNotFoundException extends CustomError {
    private static final String DEFAULT_MESSAGE = "USER_NOT_FOUND";
    private static final int DEFAULT_CODE = 404;

    private int userId;

    public UserNotFoundException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public UserNotFoundException(int id) { super(DEFAULT_MESSAGE, "No user found with id: " + id,
            DEFAULT_CODE); }

    public UserNotFoundException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public UserNotFoundException(String detailedMessage){ super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }

    public UserNotFoundException(String message, int id) { super(message, id); }
}
