import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profil } from '../interfaces/data';
import { apiUrlEnv,uri } from '../environnements/api';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  
  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.profil

  constructor(private http : HttpClient) { }

  listResources(): Observable<Profil[]> {
    return this.http.get<Profil[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: Profil){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number|null) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number|null, data: Profil) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }
}



