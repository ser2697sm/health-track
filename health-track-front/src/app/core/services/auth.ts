import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { email } from '@angular/forms/signals';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly apiLogin = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiLogin}/login`, request)
  }


}
