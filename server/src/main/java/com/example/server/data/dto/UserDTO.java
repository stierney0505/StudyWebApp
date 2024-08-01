package com.example.server.data.dto;

import com.example.server.data.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;

    public UserDTO(int id, String firstName, String lastName, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public UserDTO(int id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
    }

    @JsonIgnore
    public UserDTO getUserNoPassword() { return new UserDTO(id, firstName, lastName, email); }

    public int getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public void setId(int id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }

    public static List<UserDTO> convertToDTO(List<User> users, boolean noPassword) {
        List<UserDTO> returnDTOs = new ArrayList<UserDTO>();
        for (User user : users) { returnDTOs.add(new UserDTO(user).getUserNoPassword()); }
        return returnDTOs;
    }
}
