package com.example.server.routes;

import com.example.server.data.dto.UserDTO;
import com.example.server.data.entities.Security;
import com.example.server.data.entities.User;
import com.example.server.services.JwtService;
import com.example.server.data.dto.JwtUser;
import com.example.server.services.route_services.UserService;
import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import jakarta.servlet.http.HttpServletResponse;
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
    public UserRoutes(UserService userService, JwtService jwtService, HttpServletResponse httpServletResponse) {
        super(jwtService, httpServletResponse);
        this.userService = userService;
    }

    @PostMapping("${routes.users}")
    public ResponseEntity<Response<UserDTO>> addUser(@Valid @RequestBody User user) {
        user.setId(0); //Set id to 0 to force the id to be auto incremented by DB
        User createdUser = userService.createUser(user);
        JwtUser tempUser = new JwtUser(createdUser.getEmail(), createdUser.getId());
        assignCookie(httpServletResponse, tempUser);

        UserDTO returnUser = new UserDTO(createdUser).getUserNoPassword();
        return ResponseGenerator.CreateSuccessResponse(new Response<>(returnUser,
                "USER_CREATED", 200));
    }

    @GetMapping("${routes.users}")
    public ResponseEntity<Response<List<UserDTO>>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        List<UserDTO> returnUsers = UserDTO.convertToDTO(users, true);

        return ResponseGenerator.CreateSuccessResponse(new Response<>(returnUsers, "USERS_FOUND", 200));
    }

    @GetMapping("${routes.users}/{id}")
    public ResponseEntity<Response<UserDTO>> getUser(@PathVariable int id, @CookieValue(JWT_TOKEN_NAME) String tokenValue) {
        User user = userService.findUserById(id, getIdFromToken(tokenValue));
        UserDTO returnUser = new UserDTO(user).getUserNoPassword();
        return ResponseGenerator.CreateSuccessResponse(new Response<>(returnUser,
                "USER_FOUND", 200));
    }

    @PutMapping("${routes.users}/{id}")
    public ResponseEntity<Response<UserDTO>> updateUser(@PathVariable int id, @Valid @RequestBody User user, @CookieValue(JWT_TOKEN_NAME) String tokenValue) throws Exception {
        User tempUser = userService.updateUser(user, id, getIdFromToken(tokenValue));
        UserDTO returnUser = new UserDTO(user).getUserNoPassword();
        return ResponseGenerator.CreateSuccessResponse(new Response<>(returnUser,
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
}
