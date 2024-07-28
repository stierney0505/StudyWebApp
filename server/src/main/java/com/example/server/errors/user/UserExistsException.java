package com.example.server.errors.user;

import com.example.server.errors.CustomError;

public class UserExistsException extends CustomError {

    public UserExistsException() { super("USER_ALREADY_EXISTS", "Attempted operation cannot be performed "
            + "with existing user", 400); }

    public UserExistsException(String message, String detailedMessage, int errorCode) { super(message, detailedMessage, errorCode); }

    public UserExistsException(String message, int errorCode) { super(message, errorCode); }
}
