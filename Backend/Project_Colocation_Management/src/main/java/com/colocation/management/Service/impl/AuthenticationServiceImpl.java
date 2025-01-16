// AuthenticationServiceImpl.java
package com.colocation.management.Service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.colocation.management.Dto.JwtAuthenticationResponse;
import com.colocation.management.Dto.SignInRequest;
import com.colocation.management.Dto.SignUpRequest;
import com.colocation.management.Model.Role;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.UserRepository;
import com.colocation.management.Service.AuthenticationService;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServiceImpl jwtServiceImpl;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        if (!userRepository.existsByEmail(request.getEmail())) {
            try {
            	Role role = null;
            	if (request.getRole().equals("ADMIN")) {
            		role=Role.ADMIN;
				}else {
					if (request.getRole().equals("OWNER")) {
	            		role=Role.OWNER;
					}else {

							if (request.getRole().equals("TENANT")) {
								role=Role.TENANT;
							}else {
						
					
					role=Role.OWNER;}}
				}
                User user = User.builder()
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(role)
                        .build();
                user.setPhoneNumber(request.getPhoneNumber());
                user = userRepository.save(user);

                String token = jwtServiceImpl.generateToken(user);

                return JwtAuthenticationResponse.builder().token(token).role(user.getRole().toString()).build();
            } catch (Exception e) {
              
                throw new RuntimeException("Error occurred during signup.", e);
            }
        } else {
            throw new RuntimeException("User with email already exists.");
        }
    }

    @Override
    public JwtAuthenticationResponse signin(SignInRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

            String token = jwtServiceImpl.generateToken(user);

            return JwtAuthenticationResponse.builder().token(token).role(user.getRole().toString()).build();
        } catch (Exception e) {
         
            throw new RuntimeException("Error occurred during signin.", e);
        }
    }
    
    
}
