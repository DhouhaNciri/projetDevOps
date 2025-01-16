import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: any[] = [];  // Tasks for the logged-in user (My Tasks)
  allTasks: any[] = [];  // All tasks
  taskForm: FormGroup;  // Form group for adding a task

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      description: ['', [Validators.required]],
      emailto: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getMyTasks(); 
   
  }

  // Fetch tasks assigned to the logged-in user (My Tasks)
  getMyTasks(): void {
    this.taskService.getMyTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Fetch all tasks (All Tasks)
  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.allTasks = res;
      },
      (error) => {
        console.error('Error fetching all tasks:', error);
      }
    );
  }

  // Create a new task
  createTask(): void {
    if (this.taskForm.invalid) {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }

    const { description, emailto } = this.taskForm.value;

    this.taskService.createTask(description, emailto).subscribe(
      (res) => {
        Swal.fire('Success', 'Task created successfully!', 'success');
        this.getMyTasks();  // Refresh tasks after task is created
        this.taskForm.reset();  // Reset the form after task creation
      },
      (error) => {
        Swal.fire('Error', 'Failed to create task. Please try again.', 'error');
        console.error('Error creating task:', error);
      }
    );
  }

  // Finish the task and update the UI
  onFinishTask(taskId: number): void {
    this.taskService.finishTask(taskId).subscribe(
      (response) => {
        console.log('Task finished:', response);
        // Update the task status locally to reflect the change in the UI
        const updatedTask = this.tasks.find(task => task.id === taskId);
        if (updatedTask) {
          updatedTask.completed = true;
        }
      },
      (error) => {
        console.error('Error finishing task:', error);
      }
    );
  }

  // Handle tab change
  onTabChange(event: any): void {
    if (event.index === 0) {
      this.getMyTasks();
    } else if (event.index === 1) {
      this.getAllTasks();
    }
  }
}
