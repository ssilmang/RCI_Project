import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direction } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.direction

  constructor(private http : HttpClient) { }

  listResources(): Observable<Direction[]> {
    return this.http.get<Direction[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: Direction){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number, data: Direction) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }

}
