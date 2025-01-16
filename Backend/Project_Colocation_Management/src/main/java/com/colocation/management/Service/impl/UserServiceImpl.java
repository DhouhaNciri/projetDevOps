package com.colocation.management.Service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import com.colocation.management.Dto.UserDto;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.Role;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.LogementRepository;
import com.colocation.management.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl {

    private final UserRepository userRepository;
    @Autowired
    private  LogementRepository logementRepository;
    
    
    
    
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                if (StringUtils.isEmpty(username)) {
                    throw new IllegalArgumentException("Username cannot be null or empty");
                }

                Optional<User> userOptional = userRepository.findByEmail(username);
                if (userOptional.isPresent()) {
                    return userOptional.get();
                } else {
                    throw new UsernameNotFoundException("User not found with username: " + username);
                }
            }
        };
    }

    
    @Transactional
    public User save(User newUser) {
        if (newUser.getId() == null) {
            newUser.setCreatedAt(LocalDateTime.now());
        }

        newUser.setUpdatedAt(LocalDateTime.now());
    
        return userRepository.save(newUser);
    }

 
    
    public boolean deleteById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    
   
    public Optional<User> getUserbyid(Long userId) {
        
		return userRepository.findById(userId);
    }

    
    @Transactional
    public User update(User updatedUser) {
        if (userRepository.existsById(updatedUser.getId())) {
            updatedUser.setUpdatedAt(LocalDateTime.now());
         
            return userRepository.save(updatedUser);
        } else {
            throw new IllegalArgumentException("User with provided ID does not exist");
        }
    }

    
    
    
    public UserDto updateUser(Long userId, UserDto userDto) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Update user properties
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setPhoneNumber(userDto.getPhoneNumber());
        existingUser.setUpdatedAt(LocalDateTime.now());

        // Save the updated user
        User updatedUser = userRepository.save(existingUser);

        // Convert back to UserDto
        return new UserDto(
                updatedUser.getId().toString(),
                updatedUser.getEmail(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getPhoneNumber()
        );
    }

    
   
    public User updateUserLogement(Long userId, Long logementId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        
        Logement logement = logementRepository.findById(logementId)
                .orElseThrow(() -> new IllegalArgumentException("Logement not found with ID: " + logementId));

        // Update the logement of the user
        user.setLogement(logement);
        user.setUpdatedAt(LocalDateTime.now());
        
        // Save the user with the updated logement
        return userRepository.save(user);
    }
    
    
 
    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));
    }
    
    
 
    
    
    public List<User> allusers() {
        return userRepository.findAll();
    }
    
    
    
    
    public List<User> allowner() {
        return userRepository.findByRole(Role.OWNER);
    }
    
    public List<User> allTenant() {
        return userRepository.findByRole(Role.TENANT);
    }
    
    
   
    
  
    
    public UserDto getUserByIdAsDto(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        return new UserDto(
                user.getId().toString(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber()
        );
    }

    
    
    
    

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
 

 public User updateTokenFCM(String email, String newTokenFCM) {
     User user = getByEmail(email);
     user.setTokenfcm(newTokenFCM);
     user.setUpdatedAt(LocalDateTime.now()); 
     return userRepository.save(user);
 }

    
    
    
    
    
    
    
    
  
}