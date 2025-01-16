package com.colocation.management.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.colocation.management.Dto.TaskRequest;
import com.colocation.management.Model.Task;
import com.colocation.management.Model.User;
import com.colocation.management.Service.TaskService;
import com.colocation.management.Service.impl.UserServiceImpl;

@RestController
@RequestMapping("/api/tasks/tenant")
public class TaskController {

    private final TaskService taskService;
    
    @Autowired
    private UserServiceImpl userServiceImpl;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        User us = (User) authentication.getPrincipal();
        if (us.getLogement().getId() == userServiceImpl.getByEmail(request.getEmailto()).getLogement().getId()) {
             
        	Task task = new Task(request.getDescription(), userServiceImpl.getByEmail(request.getEmailto()), us);
        	task.setLogement(us.getLogement());
        	Task createdTask = taskService.createTask(
               task 
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(null); 
        }
    }


    @GetMapping("/user/{userId}")
    public List<Task> getTasksForUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return taskService.getTasksForUser(user);
    }

    @GetMapping("/user")
    public List<Task> getMyTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        User us = (User) authentication.getPrincipal();
        return taskService.getTasksForUser(us);
    }

    @PutMapping("/finish/{taskId}")
    public ResponseEntity<Task> finishTask(@PathVariable Long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication failed or user not authenticated");
        }
        User currentUser = (User) authentication.getPrincipal();
        Task task = taskService.getTaskById(taskId);

        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
/*********/
        if (!task.getAssignedTo().getEmail().equals(currentUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        task.setCompleted(true);
        Task updatedTask = taskService.saveTask(task);

        return ResponseEntity.ok(updatedTask);
    }
    
    @GetMapping
    public List<Task> getAllTasks() {
    	 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         if (authentication == null || !authentication.isAuthenticated()) {
             throw new RuntimeException("Authentication failed or user not authenticated");
         }
         User us = (User) authentication.getPrincipal();
        return taskService.getTasksByLogement(us.getLogement());
    }

}
