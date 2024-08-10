import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Controle } from '../../interfaces/data';
import { apiUrlEnv, uri } from '../../environnements/api';


@Injectable({
  providedIn: 'root'
})
export class ControleService {

  apiUrl = apiUrlEnv.apiUrl;
  uri = uri.data

  constructor(private http : HttpClient) { }

  listResources(): Observable<Controle[]> {
    return this.http.get<Controle[]>(this.apiUrl + this.uri.list);
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
    return this.http.post(this.apiUrl + this.uri.update + id, data);
  }
  getNotifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/read/${notificationId}`, {});
  }
  updateControlStatus(controlId: number, newEta: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${controlId}/etat/${newEta}`, {});
  }
  

}
