import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/response/user-response';
import { CreateUserRequest } from '../models/request/createUser-request';

@Injectable({
  providedIn: 'root',
})
export class User {

  private readonly apiUrl = 'http://localhost:8080/api/admin'

  constructor(private http: HttpClient) { }

  //Ver todos los usuarios
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl + '/getUsers')
  }

  //Crear un nuevo usuario
  createNewUser(value: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl + '/register', value)
  }

  getUser(uuid: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.apiUrl + '/getUser/' + uuid)
  }

}
