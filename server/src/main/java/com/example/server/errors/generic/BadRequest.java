package com.example.server.errors.generic;

import com.example.server.errors.CustomError;

public class BadRequest extends CustomError {
    private static final String DEFAULT_MESSAGE = "BAD_REQUEST";

    public BadRequest() { super(DEFAULT_MESSAGE, 400); }
    public BadRequest(String message) { super(DEFAULT_MESSAGE, message, 400); }
}
