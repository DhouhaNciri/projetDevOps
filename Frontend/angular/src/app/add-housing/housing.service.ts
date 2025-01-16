import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Housing } from './housing.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private apiUrl =  environment.apiURL;

  constructor(private http: HttpClient) {}
private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
  createHousing(housing: Housing): Observable<Housing> {
    return this.http.post<Housing>(this.apiUrl+"/housing", housing,{
      headers: this.getAuthHeaders()
    });
  }

  

    // Update an existing housing entry
    updateHousing(id: number, housing: Housing): Observable<Housing> {
      return this.http.put<Housing>(`${this.apiUrl+/housing/}${id}`, housing,{
        headers: this.getAuthHeaders()
      });
    }
}
