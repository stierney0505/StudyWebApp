package com.example.server.utils.validation;

import com.example.server.errors.generic.BadRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<PasswordValid, String> {
    private static final Pattern BCRYPT_PATTERN = Pattern.compile("\\$2[ayb]\\$.{56}");


    @Override
    public void initialize(PasswordValid constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.isEmpty()) { throw new BadRequest(); }

        if (BCRYPT_PATTERN.matcher(password).matches()) { return true; }

        if (password.length() >= 8 &&
                password.matches(".*\\d.*") &&  // at least one digit
                password.matches(".*[a-zA-Z].*") && // at least one letter
                password.matches(".*\\W.*")) { return true; } // at least one special character

        throw new BadRequest();
    }


}
