import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  private url = `${environment.apiURL}`;

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
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }

 


  createLogement(name: string, address: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/logements?name=${name}&address=${address}`, {}, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addUserToLogement(userEmail: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/logements/users?email=${userEmail}`, {}, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  
  
  deleteUserFromLogement( userId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/logements/users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllLogements(): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/logements', { headers: this.getAuthHeaders() });
  }

  getLogementPersonnel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/logements/me/logement-personnel`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLogementPersonnelForCurrentUser(): Observable<any> {
    return this.http
      .get<any>(`${this.url}/logements/me/logement-personnel`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  


 

  deleteLogement(logementId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/logements/${logementId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }




  getLogementMessages(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/chats/mylogement/messages`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Send a message to the current user's logement
  sendMessageToLogement(chatMessage: string): Observable<any> {
    const params = { chatMessage }; // Add chatMessage as query parameter
    return this.http
      .post<any>(`${this.url}/chats`, {}, { params, headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  





}
