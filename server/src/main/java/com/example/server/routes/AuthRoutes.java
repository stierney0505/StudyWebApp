package com.example.server.routes;

import com.example.server.data.entities.User;
import com.example.server.errors.auth.FailedLoginException;
import com.example.server.services.JwtService;
import com.example.server.data.dto.JwtUser;
import com.example.server.services.route_services.AuthService;
import com.example.server.utils.responses.Response;
import com.example.server.utils.responses.ResponseGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
public class AuthRoutes extends Routes {
    private AuthService authService;

    @Value("${jwt.access.name}")
    private String accessTokenName;

    @Autowired
    public AuthRoutes(AuthService authService, JwtService jwtService, HttpServletResponse httpServletResponse) {
        super(jwtService, httpServletResponse);
        this.authService = authService;
    }

    @PostMapping("${routes.login}")
    public ResponseEntity<Response<Object>> login(@RequestBody Map<String, String> loginData) {
        User result = authService.login(loginData.get("email"), loginData.get("password"));

        if (result != null) {
            JwtUser tempUser = new JwtUser(result.getEmail(), result.getId());
            assignCookie(httpServletResponse, tempUser);

            return ResponseGenerator.CreateSuccessResponse(new Response<>(null, "LOGIN_SUCCESSFUL", 200));
        } else {
            throw new FailedLoginException();
        }
    }

    @GetMapping("${routes.login}")
    public String TestSecurity() {
        return "FAILED SHOULD NOT EXECUTE WITHOUT TOKEN";
    }
}
