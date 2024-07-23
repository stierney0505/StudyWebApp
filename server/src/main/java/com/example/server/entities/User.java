package com.example.server.entities;

import com.example.server.utils.validation.PasswordValid;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="first_name")
    @NotBlank
    private String firstName;

    @Column(name="last_name")
    @NotBlank
    private String lastName;

    @Column(name="email")
    @Email
    private String email;

    @Column(name="password")
    @PasswordValid
    private String password;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "security_id", nullable = true)
    @JsonIgnore
    private Security security;

    public User() {}

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public int getId() { return id; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public Security getSecurity() { return security; }

    public void setId(int id) { this.id = id; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setSecurity(Security security) { this.security = security; }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", firstName='" + firstName + '\'' + ", lastName='" + lastName + '\''
               + ", email='" + email + '\'' + ", password='" + password + '\'' + ", security=" + security + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == this) { return true; }
        if (!(o instanceof User)) { return false; }
        User user = (User) o;
        // Ideally the ids of users should only be compared after they have been generated from the database
        return user.id == this.id;
    }
}
