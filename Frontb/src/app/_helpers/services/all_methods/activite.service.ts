import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activite } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.activite

  constructor(private http : HttpClient) { }

  listResources(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: Activite){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number, data: Activite) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }
}
