package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserNotAuthorizedException extends CustomError {
    private int userId;

    public UserNotAuthorizedException(String message, String detailedMessage, int errorCode) {
        super(message, detailedMessage, errorCode);
    }

    public UserNotAuthorizedException() { super("USER_NOT_AUTHORIZED", "User does not have the credentials to perform that action", 401); }

    public UserNotAuthorizedException(String message, int id) { super(message, id); }
}
