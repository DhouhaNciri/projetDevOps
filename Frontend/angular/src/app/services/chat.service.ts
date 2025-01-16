import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = `${environment.apiURL}/chats`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Fetch messages for the current user
  getMessages(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/user/my`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Send a message to another user
  sendMessage(chatMessage: string, userId: number): Observable<any> {


    const params = { chatMessage }; // Add chatMessage as query parameter
    return this.http
      .post<any>(`${this.url}/user/${userId}`, {}, { params, headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));

  }
}
