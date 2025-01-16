import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// src/app/Services/auth.service.ts
import { LoginResponse } from './login-response.interface';  


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiURL;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };





  constructor(private http: HttpClient) {}

  loginAdmin(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/signin`, data, this.jsonHeader);
  }

  loginStudent(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/signin`, data, this.jsonHeader);
  }

  loginCompany(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/signin`, data, this.jsonHeader);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/signup`, data, this.jsonHeader);
  }

  signupStudent(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/signup`, data, this.jsonHeader);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${this.url}/forgetPassword`, data, this.jsonHeader);
  }
}

