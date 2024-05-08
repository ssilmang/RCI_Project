import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.departement

  constructor(private http : HttpClient) { }

  listResources(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl + this.uri);
  }

  addResources(data: Departement){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number, data: Departement) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }

}
