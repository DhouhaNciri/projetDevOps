import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Housing } from '../../add-housing/housing.model'; // Assuming this is where your Housing model is defined
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  message: string = ''; // Store the user's message

  constructor(@Inject(MAT_DIALOG_DATA) public housing: Housing) {}

  sendMessage() {
    if (this.message.trim() === '') {
      Swal.fire('Error', 'Message cannot be empty.', 'error');
      return;
    }

    // Simulate sending a message (Replace this with your actual API call)
    console.log(`Message sent to ${this.housing.address}: ${this.message}`);
    
    Swal.fire('Success', 'Your message has been sent.', 'success');
    this.message = ''; // Clear the message
  }
}
