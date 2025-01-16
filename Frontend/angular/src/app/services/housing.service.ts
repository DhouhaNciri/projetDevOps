import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class HousingService {
    url = environment.apiURL;
    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        });
      }

    getAllHousing(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/housing`,{
            headers: this.getAuthHeaders()
          }); // Assuming your endpoint is /housing/all
       
    }
    countHousing(): Observable<string> {
        return this.http.get<string>(`${this.url}/housing/count`, {
          headers: this.getAuthHeaders(),
        });
      }
      

      deleteHousing(id: number): Observable<any> {
       
        return this.http.delete(`${this.url}/housing/delete/${id}`,{
            headers: this.getAuthHeaders()
          });
       
      }

   
}
