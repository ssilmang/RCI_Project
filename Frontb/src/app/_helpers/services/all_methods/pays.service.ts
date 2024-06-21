import { Injectable } from '@angular/core';
import { Contry } from '../../interfaces/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { apiUrlEnv } from '../../environnements/api';
import { apiUrlEnv, uri } from '../../environnements/api';
@Injectable({
  providedIn: 'root'
})
export class PaysService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.contry

  constructor(private http : HttpClient) { }

  listResources(): Observable<Contry[]> {
    return this.http.get<Contry[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: Contry){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number|null) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number|null, data: Contry) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }
}
