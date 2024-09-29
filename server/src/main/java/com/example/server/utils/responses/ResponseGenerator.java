package com.example.server.utils.responses;

import com.example.server.errors.CustomError;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public class ResponseGenerator<T> {

    public static ResponseEntity<Response<CustomError>> CreateErrorResponse(CustomError error) {
        return new ResponseEntity<>(new Response<>(error), HttpStatusCode.valueOf(error.getErrorCode()));
    }

    public static <T> ResponseEntity<Response<T>> CreateSuccessResponse(Response<T> response) {
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }
}
