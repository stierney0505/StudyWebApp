package com.example.server.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class RouteWhiteList {

    @Value("${routes.whitelist}")
    private String routesWhitelist;

    public boolean inWhitelist(String requestURI) {
        return routesWhitelist.contains(requestURI);
    }
}
