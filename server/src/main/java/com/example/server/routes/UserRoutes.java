package com.example.server.routes;

import com.example.server.entities.Security;
import com.example.server.entities.User;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping
public class UserRoutes {

    private UserService userService;

    @Autowired
    public UserRoutes(UserService userService) { this.userService = userService; }

    @PostMapping("${routes.users}")
    public User addUser(@RequestBody User user) {
        user.setId(0); //Set id to 0 to force the id to be auto incremented by DB
        userService.saveUser(user);
        return user;
    }

    @GetMapping("${routes.users}")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("${routes.users}/{id}")
    public User getUser(@PathVariable int id) {
        return userService.findUserById(id);
    }

    @PutMapping("${routes.users}/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) throws Exception {
        User returnUser = userService.updateUser(user, id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(returnUser).getBody();
    }

    @DeleteMapping("${routes.users}/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }

    @PostMapping("${routes.users}/securityDemo/{id}")
    public Security createSecurityDemo(@PathVariable int id) {
        return userService.demoCreateSecurity(id);
    }
}
