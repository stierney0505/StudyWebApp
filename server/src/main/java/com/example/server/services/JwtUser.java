package com.example.server.services;

public class JwtUser {

    private String email;
    public String test;

    public JwtUser(String email) { this.email = email;
    test = "Test"; }

    public String getEmail() { return email; }
}
