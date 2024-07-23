package com.example.server.dao;

import com.example.server.entities.Security;
import com.example.server.entities.User;
import com.example.server.utils.validation.PasswordValid;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {

    private EntityManager em;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserDAOImpl(EntityManager em, PasswordEncoder passwordEncoder) {
        this.em = em;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void save(User user) { em.persist(user); }

    @Override
    @Transactional
    public void createSecurity(User user, Security security) {
        user.setSecurity(security);
        security.setUser(user);
        em.merge(user);
    }

    @Override
    public User login(@Email String email, @PasswordValid String password) {
        // Uses parameters so should be safe from SQL injection
        String preparedQueryString = "from User where email = :email";
        TypedQuery<User> preparedQuery = em.createQuery(preparedQueryString, User.class)
                .setParameter("email", email);
        User testUser = preparedQuery.getSingleResult();
        if (passwordEncoder.matches(password, testUser.getPassword())) { return testUser; }
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return em.createQuery("select u from User u", User.class).getResultList();
    }

    @Override
    public User findUserById(int id) {
        return em.find(User.class, id);
    }

    @Override
    @Transactional
    public User updateUser(User user, int id) throws EntityNotFoundException {
        User oldUser = em.find(User.class, id);

        if(oldUser != null) {
            oldUser.setFirstName(user.getFirstName());
            oldUser.setLastName(user.getLastName());
            oldUser.setEmail(user.getEmail());

            return em.merge(oldUser);
        }
        throw new EntityNotFoundException();
    }

    @Override
    @Transactional
    public void deleteUser(int id) {
        em.remove(em.find(User.class, id));
    }
}
