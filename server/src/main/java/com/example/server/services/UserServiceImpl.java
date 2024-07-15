package com.example.server.services;

import com.example.server.dao.UserDAO;
import com.example.server.entities.Security;
import com.example.server.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Value("${resetKey.expiry.minutes}")
    private int expiryMinutes;

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) { this.userDAO = userDAO; }

    @Override
    public User saveUser(User user) {
        userDAO.save(user);
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        return userDAO.findAllUsers();
    }

    @Override
    public User findUserById(int id) {
        return userDAO.findUserById(id);
    }

    @Override
    public User updateUser(User user, int id) throws Exception {
        return userDAO.updateUser(user, id);
    }

    @Override
    public void deleteUser(int id) {
        userDAO.deleteUser(id);
    }

    @Override
    @Transactional
    public Security demoCreateSecurity(int id) {
        User tempUser = userDAO.findUserById(id);
        String emailKey = UUID.randomUUID().toString();
        String passKey = UUID.randomUUID().toString();
        Instant emailTime = Instant.now().plus(Duration.ofMinutes(expiryMinutes));
        Instant passTime = Instant.now().plus(Duration.ofMinutes(expiryMinutes));
        Security security = new Security(emailKey, passKey, emailTime, passTime);

        userDAO.createSecurity(tempUser, security);
        return security;
    }

    @Override
    @Transactional
    public void initPasswordReset(int id) {

    }
}
