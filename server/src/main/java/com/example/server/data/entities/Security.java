package com.example.server.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "security")
public class Security {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // passwordKey and emailKey are uuid strings that is used to validate a change in email or password
    @Column(name = "email_key")
    private String emailKey;

    @Column(name = "passwordKey")
    private String passwordKey;

    // passwordExpiry and emailExpiry are uuid strings that is used as the latest possible them the associated keys
    // can be used to reset an email or password
    @Column(name = "email_expiry")
    private Instant emailExpiry;

    @Column(name = "password_expiry")
    private Instant passwordExpiry;

    @OneToOne(mappedBy = "security", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnore
    private User user;

    public Security() {}

    public Security(String emailKey, String passwordKey, Instant emailExpiry, Instant passwordExpiry) {
        this.emailKey = emailKey;
        this.passwordKey = passwordKey;
        this.emailExpiry = emailExpiry;
        this.passwordExpiry = passwordExpiry;
    }

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getEmailKey() { return emailKey; }

    public void setEmailKey(String emailKey) { this.emailKey = emailKey; }

    public String getPasswordKey() { return passwordKey; }

    public void setPasswordKey(String passwordKey) { this.passwordKey = passwordKey; }

    public Instant getEmailExpiry() { return emailExpiry; }

    public void setEmailExpiry(Instant emailExpiry) { this.emailExpiry = emailExpiry; }

    public Instant getPasswordExpiry() { return passwordExpiry; }

    public void setPasswordExpiry(Instant passwordExpiry) { this.passwordExpiry = passwordExpiry; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "Security{" + "id=" + id + ", emailKey='" + emailKey + '\'' + ", passwordKey='" + passwordKey + '\''
               + ", emailExpiry=" + emailExpiry + ", passwordExpiry=" + passwordExpiry + ", user=" + user + '}';
    }
}
