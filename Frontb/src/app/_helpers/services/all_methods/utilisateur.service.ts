import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http : HttpClient) { }

  listResources<T>(apiUrl: string, uri: string): Observable<T[]> {
    return this.http.get<T[]>(apiUrl + uri);
  }

  addResources<T>(apiUrl: string, uri: string, data: T): Observable<T> {
    return this.http.post<T>(apiUrl + uri, data);
  }

  deleteResource<T>(apiUrl: string, uri: string, id: number): Observable<T> {
    return this.http.delete<T>(apiUrl + uri + id);
  }

  updateResources<T>(apiUrl: string, uri: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(apiUrl + uri + id, data);
  }
}
