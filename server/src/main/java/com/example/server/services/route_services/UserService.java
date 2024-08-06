package com.example.server.services.route_services;

import com.example.server.data.entities.Security;
import com.example.server.data.entities.User;
import jakarta.validation.Valid;

import java.util.List;

// User service, this interface contains all the business level logic for the application.
public interface UserService {
    User saveUser(User user);
    List<User> findAllUsers();
    User findUserById(int id, int userId);
    User updateUser(User user, int id, int userId) throws Exception;
    void deleteUser(int id, int userId);
    Security demoCreateSecurity(int id);
    public void initPasswordReset(int id);
    public User createUser(@Valid User user);
}
