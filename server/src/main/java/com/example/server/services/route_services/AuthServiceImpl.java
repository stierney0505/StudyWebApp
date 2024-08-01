package com.example.server.services.route_services;

import com.example.server.data.dao.UserDAO;
import com.example.server.data.entities.User;
import com.example.server.errors.auth.FailedLoginException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private UserDAO userDAO;

    @Autowired
    public AuthServiceImpl(UserDAO userDAO) { this.userDAO = userDAO; }

    @Override
    public User login(String email, String password) {
        User user = userDAO.login(email, password);
        if (user == null) { throw new FailedLoginException(); }
        return user;
    }
}
