
package com.colocation.management.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.colocation.management.Dto.JwtAuthenticationResponse;
import com.colocation.management.Dto.SignInRequest;
import com.colocation.management.Dto.SignUpRequest;
import com.colocation.management.Dto.UserDto;
import com.colocation.management.Model.ChatMessage;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.Task;
import com.colocation.management.Model.User;
import com.colocation.management.Service.LogementService;
import com.colocation.management.Service.impl.AuthenticationServiceImpl;
import com.colocation.management.Service.impl.UserServiceImpl;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final AuthenticationServiceImpl authenticationService;
    private final UserServiceImpl userServiceImpl;
    @Autowired
    private  LogementService logementServiceImpl;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Validated SignUpRequest request) {
    	
    	if (!userServiceImpl.existsByEmail(request.getEmail())) {
			
		
        try {
            JwtAuthenticationResponse response = authenticationService.signup(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during signup.");
        }}else {
    	 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email already exists.");
    }}

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody @Validated SignInRequest request) {
        try {
            JwtAuthenticationResponse response = authenticationService.signin(request);
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email or sign up.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid email or password.");
        }
    }
    
    
    @GetMapping("/user-by-email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            
            User user = userServiceImpl.getByEmail(email);
            UserDto userDto = new UserDto(
                user.getId().toString(), 
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber() 
            );
            
            return ResponseEntity.ok(userDto);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while retrieving user.");
        }
    }



    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            boolean isDeleted = userServiceImpl.deleteById(id);
            if (isDeleted) {
                return ResponseEntity.ok("User deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting user.");
        }
    }
    
    
    @GetMapping("/all-owners")
    public ResponseEntity<?> allOwners() {
        try {
            List<User> owners = userServiceImpl.allowner();
            List<UserDto> ownerDtos = owners.stream()
                .map(user -> new UserDto(
                    user.getId().toString(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPhoneNumber()
                ))
                .collect(Collectors.toList()); // Remplacement de toList() par collect(Collectors.toList())
            return ResponseEntity.ok(ownerDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error occurred while retrieving owners.");
        }
    }


    @GetMapping("/all-tenants")
    public ResponseEntity<?> allTenants() {
        try {
            List<User> tenants = userServiceImpl.allTenant();
            List<UserDto> tenantDtos = tenants.stream()
                .map(user -> new UserDto(
                    user.getId().toString(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPhoneNumber()
                ))
                .collect(Collectors.toList()); // Utilisation de Collectors.toList() pour assurer la compatibilité
            return ResponseEntity.ok(tenantDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error occurred while retrieving tenants.");
        }
    }


    @GetMapping("/user-by-id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserDto userDto = userServiceImpl.getUserByIdAsDto(id);
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while retrieving user.");
        }
    }

    
    @PostMapping("/update-user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Validated UserDto userDto) {
        try {
            UserDto updatedUser = userServiceImpl.updateUser(id, userDto);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while updating user.");
        }
    }
    
    
    
    
    @GetMapping("/me/logement-tasks")
    public ResponseEntity<?> getMyLogementTasks() {
        try {
            // Retrieve the currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("User is not authenticated");
            }

            User authenticatedUser = (User) authentication.getPrincipal();

            // Get the Logement associated with the user
            Logement logement = authenticatedUser.getLogement();
            if (logement == null) {
                return ResponseEntity.status(404).body("No logement found for this user.");
            }

            // Fetch the tasks for the logement
            List<Task> tasks = logement.getTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while retrieving logement tasks: " + e.getMessage());
        }
    }

    // Get Personnel for the Authenticated User's Logement
    
    
    
    

    
   /* @GetMapping("/me")
    private UserDto me() {
    	
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        
       User us= (User) authentication.getPrincipal();
     //  UserDto dto=new UserDto(us.getId(), us.getFirstName()+" "+ us.getLastName(), us.getEmail());
       return dto;
    }*/
    
}
