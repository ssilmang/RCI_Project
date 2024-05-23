import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risque } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';


@Injectable({
  providedIn: 'root'
})
export class RisqueService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.risque

  constructor(private http : HttpClient) { }

  listResources(): Observable<Risque[]> {
    return this.http.get<Risque[]>(this.apiUrl + this.uri.list);
  }

  addResources(data: any){
    return this.http.post(this.apiUrl + this.uri.add, data);
  }

  deleteResource(id: number|null) {
    return this.http.delete(this.apiUrl + this.uri.delete + id);
  }

  restaureResource(id: number|null) {
    return this.http.get(this.apiUrl + this.uri.restaurer + id);
  }

  updateResources(id: number|null, data: any) {
    return this.http.put(this.apiUrl + this.uri.update + id, data);
  }

}
