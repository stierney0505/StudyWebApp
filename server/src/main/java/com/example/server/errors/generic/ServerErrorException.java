package com.example.server.errors.generic;

import com.example.server.errors.CustomError;

public class ServerErrorException extends CustomError {

    public ServerErrorException() { super("SERVER_ERROR", 500); }
}
