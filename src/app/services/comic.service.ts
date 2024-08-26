import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/ResponseApi';
import { Comic } from '../interfaces/Comic';

@Injectable({
     providedIn: 'root'
})
export class ComicService {
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;
     constructor() { }
     
     getAllComics(limit: number, offset: number): Observable<ResponseApi> {
          return this.http.get<ResponseApi>(`${this.baseUrl}Comic/GetAll?limit=${limit}&offset=${offset}`)
     }

     getComicById(id: number): Observable<ResponseApi> {
          return this.http.get<ResponseApi>(`${this.baseUrl}Comic/GetById?id=${id}`)
     }

     getFavoriteComics(): Observable<ResponseApi> {
          return this.http.get<ResponseApi>(`${this.baseUrl}Comic/GetFavorites`)
     }

     addFavoriteComic(comicFav: Comic): Observable<ResponseApi> {
          return this.http.post<ResponseApi>(`${this.baseUrl}Comic/AddFavorite`, comicFav)
     }
}