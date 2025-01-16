package com.colocation.management.Service;

import com.colocation.management.Dto.ChatMessageResponseDto;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.LogementRepository;
import com.colocation.management.Repository.UserRepository;
import com.colocation.management.Repository.LogementRepository;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
public class LogementService {

    private final LogementRepository logementRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    public LogementService(LogementRepository logementRepository) {
        this.logementRepository = logementRepository;
    }

    // Create or Update Logement
    public Logement saveLogement(Logement logement) {
        return logementRepository.save(logement);
    }

    // Get all logements
    public List<Logement> getAllLogements() {
        return logementRepository.findAll();
    }

    // Get logement by ID
    public Optional<Logement> getLogementById(Long id) {
        return logementRepository.findById(id);
    }
    
   

    
    
    @Transactional
    public List<ChatMessageResponseDto> getMessagesForUserLogement(Long userId) {
        // Fetch the user and associated logement
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Logement logement = user.getLogement();
        if (logement == null) {
            throw new EntityNotFoundException("No logement found for this user.");
        }

        // Ensure messages are loaded
        Hibernate.initialize(logement.getMessages());

        // Map messages to DTOs
        return logement.getMessages().stream()
                .map(message -> {
                    ChatMessageResponseDto dto = new ChatMessageResponseDto();
                    dto.setId(message.getId());
                    dto.setFrom(message.getSendFrom().getEmail());
                  //  dto.setMessage(message.getChat().toString());
                    dto.setDate(message.getDate());
                  //  dto.setChatId(message.getChat().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    
    
    

    // Delete logement by ID
    public void deleteLogement(Long id) {
        logementRepository.deleteById(id);
    }
    public void deleteUserFromLogement(Long logementId, Long userId) {
        Optional<Logement> logementOptional = logementRepository.findById(logementId);
        if (logementOptional.isPresent()) {
            Logement logement = logementOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (logement.getUserPersonnels().contains(user)) {
                    logement.getUserPersonnels().remove(user);
                    user.setLogement(null);
                    userRepository.save(user); // Save the user after dissociating
                    logementRepository.save(logement); // Save the logement after removing the user
                } else {
                    throw new EntityNotFoundException("User does not belong to the specified logement.");
                }
            } else {
                throw new EntityNotFoundException("User not found.");
            }
        } else {
            throw new EntityNotFoundException("Logement not found.");
        }
    }

}
