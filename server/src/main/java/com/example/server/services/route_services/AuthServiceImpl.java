package com.example.server.services.route_services;

import com.example.server.dao.UserDAO;
import com.example.server.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private UserDAO userDAO;

    @Autowired
    public AuthServiceImpl(UserDAO userDAO) { this.userDAO = userDAO; }

    @Override
    public User login(String email, String password) { return userDAO.login(email, password); }
}
