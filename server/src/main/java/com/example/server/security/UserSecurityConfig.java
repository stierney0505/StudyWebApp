package com.example.server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

// Basic, temporary security configuration that allows for all requests to be authorized.
@Configuration
@EnableWebSecurity
public class UserSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(configurer -> configurer
                .anyRequest().permitAll()
        );
        http.httpBasic(httpBasic -> httpBasic.disable());
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}
