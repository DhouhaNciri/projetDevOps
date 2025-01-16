package com.colocation.management.Model;


import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "send_from")
   
    private User sendFrom;
    

    @ManyToOne
    @JoinColumn(name = "send_to")
    private User sendTo;
    
    
    private String message;
    private LocalDateTime date=LocalDateTime.now();
    
    @ManyToOne
    @JoinColumn(name = "logement_id")
   @JsonIgnore
    private Logement logement;
}
