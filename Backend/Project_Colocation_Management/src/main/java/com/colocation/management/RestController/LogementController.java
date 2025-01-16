package com.colocation.management.RestController;

import com.colocation.management.Dto.ChatMessageResponseDto;
import com.colocation.management.Dto.LogementDto;
import com.colocation.management.Dto.UserDto;
import com.colocation.management.Model.ChatMessage;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.User;
import com.colocation.management.Service.LogementService;
import com.colocation.management.Service.impl.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/logements")
public class LogementController {

    private final LogementService logementService;
    @Autowired
    private  UserServiceImpl userServiceImpl;
    @Autowired
    public LogementController(LogementService logementService) {
        this.logementService = logementService;
    }

    // Get all logements
    @GetMapping
    public List<Logement> getAllLogements() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        User authenticatedUser = (User) authentication.getPrincipal();
        
    	List<Logement> logements=new ArrayList<Logement>();
    	logements.add(authenticatedUser.getLogement());
        return logements;
    }

    // Get logement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Logement> getLogementById(@PathVariable Long id) {
        Optional<Logement> logement = logementService.getLogementById(id);
        return logement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create or Update logement
    @PostMapping
    public ResponseEntity<Logement> createOrUpdateLogement(@RequestParam String name, @RequestParam String address) {
        try {
        	Logement  logement =new Logement();
            logement.setAddress(address);
            logement.setName(name);
            // Get the authenticated user
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            User authenticatedUser = (User) authentication.getPrincipal();
            
            // Add the authenticated user to the logement's personnel list
          //  logement.addAuthenticatedUser(authenticatedUser);
         //   logement.getUserPersonnels().add(authenticatedUser);

            Logement savedLogement = logementService.saveLogement(logement);
            userServiceImpl.updateUserLogement(authenticatedUser.getId(), logement.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedLogement);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Delete logement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogement(@PathVariable Long id) {
        logementService.deleteLogement(id);
        return ResponseEntity.noContent().build();
    }
    
    
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUserFromLogement( @PathVariable Long userId) {
    	
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User authenticatedUser = (User) authentication.getPrincipal();
        logementService.deleteUserFromLogement(authenticatedUser.getLogement().getId(), userId);
        return ResponseEntity.noContent().build();
    }
    
    
    @PostMapping("users")
    public ResponseEntity<?> addUserToLogementByEmail( @RequestParam String email) {
    	
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User authenticatedUser = (User) authentication.getPrincipal();
        try {
            // Retrieve the Logement by ID
            Optional<Logement> logementOptional = logementService.getLogementById(authenticatedUser.getLogement().getId());
            if (!logementOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Logement not found");
            }
            Logement logement = logementOptional.get();

            // Retrieve the User by Email
            Optional<User> userOptional = Optional.of(userServiceImpl.getByEmail(email));
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
            }
            User user = userOptional.get();

            // Add the user to the Logement's personnel list
           // logement.addAuthenticatedUser(user);

            // Save the updated Logement
           // logementService.saveLogement(logement);
            userServiceImpl.updateUserLogement(user.getId(), authenticatedUser.getLogement().getId());

            return ResponseEntity.status(HttpStatus.OK).body("User added to Logement successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }
    
    
    
    @GetMapping("/me/logement-personnel")
    public ResponseEntity<?> getMyLogementPersonnel() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("User is not authenticated");
            }

            User authenticatedUser = (User) authentication.getPrincipal();
            Logement logement = authenticatedUser.getLogement();

            if (logement == null) {
                return ResponseEntity.status(404).body("No logement found for this user.");
            }

            // Map to LogementDto
            LogementDto logementDto = new LogementDto();
            logementDto.setId(logement.getId());
            logementDto.setName(logement.getName());
            logementDto.setAddress(logement.getAddress());

            List<UserDto> personnelDtos = logement.getUserPersonnels().stream()
            	    .map(user -> new UserDto(user.getId().toString(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getPhoneNumber()))
            	    .collect(Collectors.toList());

            logementDto.setUserPersonnels(personnelDtos);

            return ResponseEntity.ok(logementDto);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while retrieving logement personnel: " + e.getMessage());
        }
    }


    @GetMapping("/me/logement-messages")
    public ResponseEntity<?> getMyLogementMessages() {
        try {
            // Retrieve the currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("User is not authenticated");
            }

            User authenticatedUser = (User) authentication.getPrincipal();

            // Fetch logement messages via the service
            List<ChatMessage> messageDtos = authenticatedUser.getLogement().getMessages();

            return ResponseEntity.ok(messageDtos);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }



    
    
    
    
}
