package com.example.server.errors.auth;

import com.example.server.errors.CustomError;

public class FailedLoginException extends CustomError {
    public FailedLoginException() { super("LOGIN_FAILED", "Invalid email or password", 401); }
    public FailedLoginException(String message, int id) { super(message, id); }
}
