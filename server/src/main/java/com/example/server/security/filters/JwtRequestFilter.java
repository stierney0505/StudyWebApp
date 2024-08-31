package com.example.server.security.filters;

import com.example.server.errors.user.UserNotAuthenticatedException;
import com.example.server.services.JwtService;
import com.example.server.utils.RouteWhiteList;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Autowired
    private RouteWhiteList routeWhiteList;

    @Value("${jwt.access.name}")
    private String accessTokenName;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        RequestMatcher ignoredPath = new AntPathRequestMatcher("/api/auth");

        if (routeWhiteList.inWhitelist(request.getRequestURI()) && request.getMethod().equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        Cookie[] cookies = request.getCookies();
        if (cookies == null) { handleException(request, response, new UserNotAuthenticatedException()); }

        try {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(accessTokenName)) {
                    if (jwtService.validate(cookie.getValue())) {
                        String user = jwtService.getEmailFromToken(cookie.getValue());

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                user, null, new ArrayList<>());

                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);

                        filterChain.doFilter(request, response);
                        return;
                    }
                }
            }
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }

    private void handleException(HttpServletRequest request, HttpServletResponse response, Exception e) throws IOException, ServletException {
        handlerExceptionResolver.resolveException(request, response, null, e);
    }

    @Bean
    public FilterRegistrationBean registration(JwtRequestFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }
}
