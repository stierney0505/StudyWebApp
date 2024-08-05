package com.example.server.routes;

import com.example.server.entities.Security;
import com.example.server.entities.User;
import com.example.server.services.JwtService;
import com.example.server.services.route_services.UserService;
import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping
public class UserRoutes extends Routes{

    private UserService userService;

    @Autowired
    public UserRoutes(UserService userService, JwtService jwtService) {
        super(jwtService);
        this.userService = userService;
    }

    @PostMapping("${routes.users}")
    public ResponseEntity<Response<User>> addUser(@Valid @RequestBody User user) {
        user.setId(0); //Set id to 0 to force the id to be auto incremented by DB
        return ResponseGenerator.CreateSuccessResponse(new Response<>(userService.createUser(user),
                "USER_CREATED", 200));
    }

    @GetMapping("${routes.users}")
    public ResponseEntity<Response<List<User>>> getAllUsers() {
        return ResponseGenerator.CreateSuccessResponse(new Response<>(userService.findAllUsers(),
                "USERS_FOUND", 200));
    }

    @GetMapping("${routes.users}/{id}")
    public ResponseEntity<Response<User>> getUser(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        return ResponseGenerator.CreateSuccessResponse(new Response<>(userService.findUserById(id, getIdFromToken(tokenValue)),
                "USER_FOUND", 200));
    }

    @PutMapping("${routes.users}/{id}")
    public ResponseEntity<Response<User>> updateUser(@PathVariable int id, @Valid @RequestBody User user, @CookieValue(JWT_TOKEN_NAME) String tokenValue) throws Exception {
        return ResponseGenerator.CreateSuccessResponse(new Response<>(userService.updateUser(user, id, getIdFromToken(tokenValue)),
                "USER_UPDATED", 200));
    }

    @DeleteMapping("${routes.users}/{id}")
    public ResponseEntity<Response<Object>> deleteUser(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        userService.deleteUser(id, getIdFromToken(tokenValue));
        return ResponseGenerator.CreateSuccessResponse(new Response<>(null,
                "USER_DELETED", 200));
    }

    @PostMapping("${routes.users}/securityDemo/{id}")
    public Security createSecurityDemo(@PathVariable int id) {
        return userService.demoCreateSecurity(id);
    }

    int getIdFromToken(String token) {
        return jwtService.getClaimFromToken(token, "id", Integer.class);
    }
}
