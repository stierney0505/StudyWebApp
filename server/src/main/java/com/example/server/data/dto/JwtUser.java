package com.example.server.data.dto;

public class JwtUser {

    private String email;
    public int id;

    public JwtUser(String email, int id) { this.email = email; this.id = id; }

    public String getEmail() { return email; }
    public Integer getId() { return id; }
}
