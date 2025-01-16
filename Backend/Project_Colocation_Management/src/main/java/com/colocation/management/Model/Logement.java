package com.colocation.management.Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Logement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @OneToMany(mappedBy = "logement",  fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> userPersonnels = new ArrayList<>();

    @OneToMany(mappedBy = "logement", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "logement", fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion during serialization
    private List<ChatMessage> messages;

    public void addAuthenticatedUser(User user) {
        if (this.userPersonnels == null) {
            this.userPersonnels = new ArrayList<>();
        }
        this.userPersonnels.add(user);
    }
    
    
    public void addUser(User user) {
        if (userPersonnels == null) {
            userPersonnels = new ArrayList<>();
        }
        userPersonnels.add(user);
        user.setLogement(this);
    }

    public void removeUser(User user) {
        if (userPersonnels != null) {
            userPersonnels.remove(user);
            user.setLogement(null);
        }
    }

    
    
}
