package com.example.server.errors;

public abstract class CustomError extends RuntimeException {
    private String detailedMessage;
    private String message;
    private int errorCode;

    public CustomError(String message, String detailedMessage, int errorCode) {
        super(detailedMessage);
        this.detailedMessage = detailedMessage;
        this.message = message;
        this.errorCode = errorCode;
    }

    public CustomError(String message, int errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }

    public int getErrorCode() { return errorCode; }
    public String getDetailedMessage() { return detailedMessage; }
    public String getMessage() { return message; }
}
