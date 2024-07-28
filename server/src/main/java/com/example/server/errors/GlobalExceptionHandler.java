package com.example.server.errors;


import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomError.class)
    public ResponseEntity<Response<CustomError>> handleCustomError(CustomError e) {
        return ResponseGenerator.CreateErrorResponse(e);
    }
}
