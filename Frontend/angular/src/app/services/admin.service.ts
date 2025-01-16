import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  // Method to get the JWT token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllTenant() {
    return this.http.get(`${this.url}/auth/all-tenants`, {
      headers: this.getAuthHeaders()
    });
  }

  getUserByEmail(email: any) {
    return this.http.get(`${this.url}/auth/user-by-email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  getCompanyByEmail(email: any) {
    return this.http.get(`${this.url}/auth/user-by-email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllOwner() {
    return this.http.get(`${this.url}/auth/all-owners`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/auth/delete-user/${id}`, {
      responseType: 'text',
      headers: this.getAuthHeaders()
    });
  }

  

  getUserById(id: any) {
    return this.http.get(`${this.url}/auth/user-by-id/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

 



  updateUser(data: any, id: any) {
    return this.http.post(`${this.url}/auth/update-user/${id}`, data, {
      responseType: 'text',
      headers: this.getAuthHeaders()
    });
  }

 
}

