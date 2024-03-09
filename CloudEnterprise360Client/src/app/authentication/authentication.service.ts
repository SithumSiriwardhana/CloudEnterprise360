import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/authentication/register.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http:HttpClient
  )
  {
  }

  register(model: Register) {
    return this.http.post(`${environment.apiUrl}/api/authentication/register`, model);
  }

}
