import { Component, OnInit } from '@angular/core';
import { LogementService } from '../services/logement.service';

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.scss'],
})
export class LogementComponent implements OnInit {
  logements: any[] = [];
  personnel: any[] = [];
  messages: any[] = [];
  newLogement: { name: string; address: string } = { name: '', address: '' };
  logementIdToAddUser!: number;
  userEmailToAdd!: string;
  messageToSend!: string;
  errorMessage: string = '';
  successMessage: string = '';
  loadingMessages: boolean = false;
  
  newMessage: string = '';
 



  constructor(private logementService: LogementService) {}

  ngOnInit(): void {
    this.getLogementPersonnel();
    this.getAllLogements();  
    this.getLogementMessages();
  
  }


  getLogementPersonnel(): void {
    this.logementService.getLogementPersonnelForCurrentUser().subscribe(
      (data) => {
        this.personnel = data.userPersonnels;  // Assuming the response contains a userPersonnels array
      },
      (error) => {
        this.errorMessage = 'Error loading logement personnel.';
        this.setTimeoutToClearMessages();
      }
    );
  }





  
  // Fetch all logements
  getAllLogements(): void {
    this.logementService.getAllLogements().subscribe(
      (data) => {
        this.logements = data;
      //  this.getMyLogementMessages(); // Fetch messages for all logements
      },
      (error) => {
        this.errorMessage = 'Error loading logements.';
      }
    );
  }

 

  // Fetch messages related to the current logement
  getMyLogementMessages(): void {
    this.logementService.getLogementMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        this.errorMessage = 'Error retrieving messages.';
        this.setTimeoutToClearMessages();
      }
    );
  }

  // Delete a logement
  deleteLogement(logementId: number): void {
    this.logementService.deleteLogement(logementId).subscribe(
      () => {
        this.getAllLogements();  // Refresh the logements list after deletion
        this.successMessage = 'Logement deleted successfully!';
        this.setTimeoutToClearMessages();
      },
      (error) => {
        this.errorMessage = 'Error deleting logement.';
        this.setTimeoutToClearMessages();
      }
    );
  }
  

  

  

  // Create a new logement
  createLogement(): void {
    const { name, address } = this.newLogement;
    this.logementService.createLogement(name, address).subscribe(
      (response) => {
        this.getAllLogements();  // Refresh logements after creating new one
        this.newLogement = { name: '', address: '' };  // Reset form
        this.successMessage = 'Logement created successfully!';
        this.setTimeoutToClearMessages();
      },
      (error) => {
        this.errorMessage = 'Error creating logement.';
        this.setTimeoutToClearMessages();
      }
    );
  }

  addUserToLogement(): void {
    if (!this.userEmailToAdd) {
      this.errorMessage = 'Please provide a valid email.';
      this.setTimeoutToClearMessages();
      return;
    }
    
    this.logementService.addUserToLogement(this.userEmailToAdd).subscribe(
      (response) => {
        this.successMessage = 'User added successfully!';
        this.userEmailToAdd = ''; // Clear input after adding
        this.setTimeoutToClearMessages();
        this.getLogementPersonnel(); // Refresh personnel data
      },
      (error) => {
        this.errorMessage = 'Error adding user to logement.';
        this.setTimeoutToClearMessages();
      }
    );
  }
  
  


  deleteUserFromLogement( userId: number): void {
    this.logementService.deleteUserFromLogement( userId).subscribe(
      () => {
        this.successMessage = 'User removed successfully!';
        this.getLogementPersonnel(); // Refresh personnel list
        this.setTimeoutToClearMessages();
      },
      (error) => {
        this.errorMessage = 'Error removing user from logement.';
        this.setTimeoutToClearMessages();
      }
    );
  }
  

  // Send a message to the logement
  







  getLogementMessages(): void {
    this.logementService.getLogementMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        this.errorMessage = 'Error loading messages.';
        this.setTimeoutToClearMessages();
      }
    );
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      this.errorMessage = 'Message cannot be empty!';
      this.setTimeoutToClearMessages();
      return;
    }
  
    this.logementService.sendMessageToLogement(this.newMessage).subscribe(
      () => {
        // Clear the input field
        this.newMessage = '';
        // Set a success message
        this.successMessage = 'Message sent successfully!';
        this.setTimeoutToClearMessages();
        // Fetch the updated list of messages
        this.getLogementMessages();
      },
      (error) => {
        // Handle error and display an error message
        this.errorMessage = 'Error sending message. Please try again.';
        console.error('Send message error:', error);
        this.setTimeoutToClearMessages();
      }
    );
  }
  
  











  // Helper function to clear messages after a few seconds
  setTimeoutToClearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);  // Hide messages after 5 seconds
  }
}
