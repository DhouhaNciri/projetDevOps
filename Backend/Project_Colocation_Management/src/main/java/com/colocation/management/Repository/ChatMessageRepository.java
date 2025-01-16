package com.colocation.management.Repository;


import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.colocation.management.Model.ChatMessage;
import com.colocation.management.Model.Logement;
import com.colocation.management.Model.User;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
	 List<ChatMessage> findBySendFrom(User sendFrom);

	    List<ChatMessage> findByLogement(Logement logement);
	    
	    
	    
	    
	    @Query("SELECT cm FROM ChatMessage cm WHERE (cm.sendFrom = :user OR cm.sendTo = :user) AND (cm.logement = :logement OR cm.logement IS NULL)")
	    List<ChatMessage> findMessagesByUserAndOptionalLogement(User user, Logement logement);

  
}
