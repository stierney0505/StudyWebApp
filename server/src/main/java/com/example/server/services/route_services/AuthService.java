package com.example.server.services.route_services;

import com.example.server.data.entities.User;

public interface AuthService {
    public User login(String email, String password);
}
