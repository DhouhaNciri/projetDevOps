import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../components/messages/message';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private baseUrl = 'http://localhost:9090/api/messages';

  constructor(private http: HttpClient) {}

  sendMessage(senderId: number, receiverId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/send`, { senderId, receiverId, content });
  }

  getMessages(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/user/${userId}`);
  }

  markAsRead(messageId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/read/${messageId}`, {});
  }
}
