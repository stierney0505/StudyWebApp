package com.example.server.errors.auth;

import com.example.server.errors.CustomError;

public class FailedLoginException extends CustomError {
    private static final String DEFAULT_MESSAGE = "LOGIN_FAILED";
    private static final int DEFAULT_CODE = 401;

    public FailedLoginException(String detailedMessage) { super(DEFAULT_MESSAGE, detailedMessage, DEFAULT_CODE); }

    public FailedLoginException() { super(DEFAULT_MESSAGE, DEFAULT_CODE); }

    public FailedLoginException(String message, int id) { super(message, id); }
}
