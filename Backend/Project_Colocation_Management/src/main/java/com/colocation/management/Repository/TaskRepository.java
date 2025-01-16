package com.colocation.management.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colocation.management.Model.Logement;
import com.colocation.management.Model.Task;
import com.colocation.management.Model.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
    List<Task> findByLogement(Logement logement); // New method
}
