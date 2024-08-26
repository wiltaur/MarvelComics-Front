import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { ResponseApi } from '../interfaces/ResponseApi';

@Injectable({
     providedIn: 'root'
})
export class AccessService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { }

     registerUser(objet: User): Observable<ResponseApi> {
          return this.http.post<ResponseApi>(`${this.baseUrl}User/RegisterUser`, objet)
     }

     login(objet: Login): Observable<ResponseApi> {
          return this.http.post<ResponseApi>(`${this.baseUrl}User/ValidateUser`, objet)
     }

     validateToken(token: string): Observable<ResponseApi> {
          return this.http.get<ResponseApi>(`${this.baseUrl}Secure/ValidateToken?token=${token}`)
     }

     getIdTypes() : Observable<ResponseApi>{
          return  this.http.get<ResponseApi>(`${this.baseUrl}IdentificationType/GetIdTypes`)
       }
}