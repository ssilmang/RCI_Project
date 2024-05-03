import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private breukh: HttpClient) {}

  userDoneFalse()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/userDoneFalse")
  }
  
  login(data: any)
  {
    return this.breukh.post('http://127.0.0.1:8000/api/login',
    {
      identifiant: data.identifiant,
      password: data.password
    })
  }

  setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }


}
