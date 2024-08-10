import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrlEnv } from '../environnements/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = apiUrlEnv.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl+'login', { email, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.clear()
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
  }
  getUserConnected(){
    return localStorage.getItem("user");
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

}
