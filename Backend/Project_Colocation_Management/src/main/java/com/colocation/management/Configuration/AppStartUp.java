package com.colocation.management.Configuration;

import com.colocation.management.Model.Role;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AppStartUp implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
       
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@colocation.com");
            admin.setPassword(passwordEncoder.encode("admin123")); 
            admin.setRole(Role.ADMIN);
            admin.setPhoneNumber("0000000000");
            userRepository.save(admin);
            System.out.println("Admin user created: admin@colocation.com / admin123");
        }
    }
}
