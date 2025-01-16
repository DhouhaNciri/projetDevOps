package com.colocation.management.Service;

import com.colocation.management.Dto.JwtAuthenticationResponse;
import com.colocation.management.Dto.SignInRequest;
import com.colocation.management.Dto.SignUpRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);
    JwtAuthenticationResponse signin(SignInRequest request);
}
