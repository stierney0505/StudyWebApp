package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserNotFoundException extends CustomError {
    private int userId;

    public UserNotFoundException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public UserNotFoundException(int id) { super("USER_NOT_FOUND", "No user found with id: " + id, 404); }

    public UserNotFoundException() { super("USER_NOT_FOUND", "No user found for given id", 404); }

    public UserNotFoundException(String message, int id) { super(message, id); }
}
