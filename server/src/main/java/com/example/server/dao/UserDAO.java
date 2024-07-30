package com.example.server.dao;

import com.example.server.entities.Security;
import com.example.server.entities.User;

import java.util.List;

// DAO (Data Access Object) for the user schema in the database. Here will be all the methods that will be
// used to access, modify, or delete user information in the database. These methods will be used in services
// to achieve intended application outcomes.
public interface UserDAO {
    void save(User user);
    List<User> findAllUsers();
    User findUserById(int id);
    User updateUser(User user, int id) throws Exception;
    boolean deleteUser(int id);
    void createSecurity(User user, Security security);
    User login(String username, String password);
}
