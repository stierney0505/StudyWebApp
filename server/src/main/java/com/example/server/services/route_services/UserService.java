package com.example.server.services.route_services;

import com.example.server.entities.Security;
import com.example.server.entities.User;
import jakarta.validation.Valid;

import java.util.List;

// User service, this interface contains all the business level logic for the application.
public interface UserService {
    User saveUser(User user);
    List<User> findAllUsers();
    User findUserById(int id);
    User updateUser(User user, int id) throws Exception;
    void deleteUser(int id);
    Security demoCreateSecurity(int id);
    public void initPasswordReset(int id);
    public User createUser(@Valid User user);
}
