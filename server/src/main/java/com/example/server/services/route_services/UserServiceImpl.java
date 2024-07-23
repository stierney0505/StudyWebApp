package com.example.server.services.route_services;

import com.example.server.dao.UserDAO;
import com.example.server.entities.Security;
import com.example.server.entities.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private PasswordEncoder passwordEncoder;

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        userDAO.save(user);
        return user;
    }


    @Override
    public User createUser(@Valid User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public User updateUser(@Valid User user, int id) throws Exception {
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
