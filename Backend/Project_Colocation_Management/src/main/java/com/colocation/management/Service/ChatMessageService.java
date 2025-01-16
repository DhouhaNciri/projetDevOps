package com.colocation.management.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.colocation.management.Model.ChatMessage;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.ChatMessageRepository;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    
    @Autowired
    private EmailService emailService;

    public List<ChatMessage> getChatsByUser(User user) {
        return chatMessageRepository.findBySendFrom(user);
    }

    public List<ChatMessage> getChatsByLogement(Logement logement) {
        return chatMessageRepository.findByLogement(logement);
    }

    public ChatMessage createMessage(ChatMessage chatMessage) {
        chatMessage.setDate(java.time.LocalDateTime.now());
        if(chatMessage.getSendTo()!= null) {
         emailService.sendEmail(chatMessage.getSendTo().getEmail(), chatMessage.getSendFrom().getFirstName(), chatMessage.getMessage());
        }
        return chatMessageRepository.save(chatMessage);
    }
    
    
   

    public List<ChatMessage> getMessagesByUser(User user) {
        return chatMessageRepository.findMessagesByUserAndOptionalLogement(user, null);
    }

    public Optional<ChatMessage> getMessageById(Long id) {
        return chatMessageRepository.findById(id);
    }

    public ChatMessage updateMessage(Long id, String newContent) {
        Optional<ChatMessage> optionalMessage = chatMessageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            ChatMessage message = optionalMessage.get();
            message.setMessage(newContent);
            message.setDate(java.time.LocalDateTime.now());
            return chatMessageRepository.save(message);
        } else {
            throw new RuntimeException("Message not found with ID: " + id);
        }
    }

    public void deleteMessage(Long id) {
        chatMessageRepository.deleteById(id);
    }
    
    
    
}
