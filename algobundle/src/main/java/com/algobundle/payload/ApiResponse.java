package com.algobundle.payload;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    // No-arg constructor
    public ApiResponse() {}

    // Constructor with all fields
    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // Getter and Setter for success
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    // Getter and Setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Getter and Setter for data
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
