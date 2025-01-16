package com.colocation.management.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colocation.management.Model.Logement;
import com.colocation.management.Model.Task;
import com.colocation.management.Model.User;
import com.colocation.management.Repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksForUser(User user) {
        return taskRepository.findByAssignedTo(user);
    }
    public List<Task> getTasksByLogement(Logement logement) {
        return taskRepository.findByLogement(logement);
    }
    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);  
    }
}
