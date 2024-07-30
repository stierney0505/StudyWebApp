package com.example.server.errors.generic;

import com.example.server.errors.CustomError;

public class BadRequest extends CustomError {

    public BadRequest() { super("BAD_REQUEST", 400); }
}
