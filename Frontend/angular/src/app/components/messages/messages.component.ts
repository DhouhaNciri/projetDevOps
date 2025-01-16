import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { Message } from './message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  newMessageContent: string = '';
  senderId = 1; // Replace with logged-in user's ID
  receiverId = 2; // Replace with selected receiver's ID

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messagingService.getMessages(this.senderId).subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (this.newMessageContent.trim()) {
      this.messagingService
        .sendMessage(this.senderId, this.receiverId, this.newMessageContent)
        .subscribe(() => {
          this.newMessageContent = '';
          this.fetchMessages();
        });
    }
  }

  markAsRead(messageId: number): void {
    this.messagingService.markAsRead(messageId).subscribe(() => {
      this.fetchMessages();
    });
  }
}
