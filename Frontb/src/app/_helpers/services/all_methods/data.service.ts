import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.controle

  constructor(private http : HttpClient) { }

  listResources(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl + this.uri.list);
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
  
  restaureResource(id: number|null) {
    return this.http.get(this.apiUrl + this.uri.restaurer + id);
  }

  validateResource(id: number|null) {
    return this.http.get(this.apiUrl + this.uri.validated + id);
  }

  desarchiverResource(id: number|null) {
    return this.http.get(this.apiUrl + this.uri.restaurer + id);
  }

}
