import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  url = environment.apiURL+'/tasks/tenant';
  constructor(private http: HttpClient) {}
private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
  // Fetch tasks for the logged-in user
  getMyTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/user`, {
      headers: this.getAuthHeaders()
    });
  }




  
  // Create a new task
  createTask(description: string, emailto: string): Observable<any> {
    return this.http.post<any>(this.url, { description, emailto }, {
      headers: this.getAuthHeaders()
    });
  }

  
  finishTask(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.url}/finish/${taskId}`, null, {
      headers: this.getAuthHeaders()
    });
  }
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`, {
      headers: this.getAuthHeaders()
    });
  }
  


}