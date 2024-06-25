import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risque, TypeControle } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.typecontrole

  constructor(private http : HttpClient) { }

  listResources(): Observable<TypeControle[]> {
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
