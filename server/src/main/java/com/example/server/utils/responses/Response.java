package com.example.server.utils.responses;

import com.example.server.errors.CustomError;

public class Response<T> {
    private int statusCode;
    private String message;
    private String detailedMessage;
    private T data;
    private Meta meta;

    public Response(T data, String detailedMessage, String message, int statusCode) {
        this.data = data;
        this.detailedMessage = detailedMessage;
        this.message = message;
        this.statusCode = statusCode;
    }

    public Response(T data, String message, int statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    public Response(CustomError error) {
        this.statusCode = error.getErrorCode();
        this.detailedMessage = error.getDetailedMessage();
        this.message = error.getMessage();
    }

    public Response(T data, CustomError error) {
        this.data = data;
        this.statusCode = error.getErrorCode();
        this.detailedMessage = error.getDetailedMessage();
        this.message = error.getMessage();
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }
}
