package com.colocation.management.Service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.colocation.management.Model.User;

public interface UserService extends UserDetailsService {
    User save(User newUser);
}
