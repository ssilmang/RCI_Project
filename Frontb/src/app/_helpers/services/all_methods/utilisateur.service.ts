import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.utilisateur

  constructor(private http : HttpClient) { }

  listResources(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: any){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number | null) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  updateResources(id: number | null, data: any) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }

}
