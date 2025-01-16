package com.colocation.management.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.colocation.management.Model.ChatMessage;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.User;
import com.colocation.management.Service.ChatMessageService;
import com.colocation.management.Service.impl.UserServiceImpl;

@RestController
@RequestMapping("/api/chats")
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private  UserServiceImpl userServiceImpl;
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChatMessage>> getChatsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return ResponseEntity.ok(chatMessageService.getChatsByUser(user));
    }

    @GetMapping("/mylogement/messages")
    public ResponseEntity<List<ChatMessage>> getChatsByLogement() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        
       User us= (User) authentication.getPrincipal();
       
        return ResponseEntity.ok(chatMessageService.getChatsByLogement(us.getLogement()));
    }

    @PostMapping
    public ResponseEntity<ChatMessage> createMessagetologment(@RequestParam String chatMessage) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        
       User us= (User) authentication.getPrincipal();
       ChatMessage message =new ChatMessage();
       message.setSendFrom(us);
       message.setLogement(us.getLogement());
       message.setMessage(chatMessage);
        ChatMessage savedMessage = chatMessageService.createMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
    
    
    
    @GetMapping("/user/my")
    public ResponseEntity<List<ChatMessage>> getMessagesByUser() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        
       User us= (User) authentication.getPrincipal();
        List<ChatMessage> messages = chatMessageService.getMessagesByUser(us);
        return ResponseEntity.ok(messages);
    }
    @PostMapping("/user/{userId}")
    public ResponseEntity<ChatMessage> createMessage(@RequestParam String chatMessage,@PathVariable Long userId) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        
       User us= (User) authentication.getPrincipal();
       ChatMessage message =new ChatMessage();
       message.setSendFrom(us);
       message.setLogement(null);
       message.setMessage(chatMessage);
       message.setSendTo(userServiceImpl.getUserbyid(userId).get());
        ChatMessage savedMessage = chatMessageService.createMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ChatMessage> updateMessage(@PathVariable Long id, @RequestParam String newContent) {
        return ResponseEntity.ok(chatMessageService.updateMessage(id, newContent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        chatMessageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
