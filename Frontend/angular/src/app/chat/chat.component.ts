import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: any[] = []; // Holds the list of messages
  messageContent: string = ''; // Holds the new message content
  recipientId: number = 0; // Holds the recipient user ID

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.recipientId = params['userId']; // Now you can use the recipientId in your chat logic
    });
  }

  ngOnInit(): void {
    this.loadMessages(); // Load messages when the component initializes
  }

  // Load messages from the server
  loadMessages(): void {
    this.chatService.getMessages().subscribe({
      next: (data) => (this.messages = data),
      error: (error) => console.error('Error loading messages:', error),
    });
  }

  // Send a new message
  sendMessage(): void {
    if (this.messageContent && this.recipientId) {
      this.chatService
        .sendMessage(this.messageContent, this.recipientId)
        .subscribe({
          next: (response) => {
            console.log('Message sent:', response);
            this.messages.push(response); // Add the new message to the list
            this.messageContent = ''; // Clear the input field
          },
          error: (error) => console.error('Error sending message:', error),
        });
    }
  }

  // Set the recipientId when a message is clicked
  setRecipientId(senderId: number): void {
    this.recipientId = senderId; // Update the recipientId to the clicked message's sender ID
  }
}
