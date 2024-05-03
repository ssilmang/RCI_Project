import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  utilisateurs: any[]=[];
  private dataSource = new BehaviorSubject<any>(null);

  data = this.dataSource.asObservable();

  setData(data: any) {
    this.dataSource.next(data);
  }

  private dataSrc = new BehaviorSubject<any>(null);

  data2 = this.dataSrc.asObservable();

  setData2(data: any) {
    this.dataSrc.next(data);
  }
  constructor(private  http:HttpClient) {}

  private  baseUrl = 'http://localhost:8000/api';



  getUsers() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/Allutilisateur');
  }
  getprofil() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/Allprofils');
  }


  updateUser(id: number) {
    return this.http.get<any>(`${this.baseUrl}/modifier/${id}`);
  }

  createUser(user: any[]):Observable<any[]> {
    return this.http.post<any[]>(`http://127.0.0.1:8000/api/utilisateur`, user);
  }
  createProfil(profil: any):Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/profil`,profil);
  }
  countresponsable() {
    return this.http.get<any>(`${this.baseUrl}/countresponsable`);
  }
  countadmin() {
    return this.http.get<any>(`${this.baseUrl}/countadmin`);
  }
  countuser() {
    return this.http.get<any>(`${this.baseUrl}/countuser`);
  }
  allEntite() {
    return this.http.get<any>(`${this.baseUrl}/allEntite`);
  }
  deleteuser(id: number, userId :number) {
    return this.http.delete<any>(`${this.baseUrl}/supprime_users/${id}/${userId}`);
  }
  upUser(data: any, id: number, userId :number) {
    return this.http.post<any>(`${this.baseUrl}/upUser/${id}/${userId}`, data);
  }
  deleteprofil(profilId :number) {
    return this.http.delete<any>(`${this.baseUrl}/supprime_profil/${profilId}`);
  }
  updateprofil(profilId: any, nouveauLibelle: string) {
    return this.http.put<any>(`${this.baseUrl}/modifierProfli/${profilId}`, { libelle: nouveauLibelle });
  }
  getProfilById(profilId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${profilId}`);
  }
  sendEmail(to: string, subject: string, message: string) {
    return this.http.post<any>(`http://127.0.0.1:8000/api/send-email`, { to, subject, message });
  }
  // getUser(): any {
  //   // Ici, vous devriez implémenter la logique pour récupérer les données de l'utilisateur depuis votre service d'authentification
  //   // Cela peut impliquer de récupérer les données depuis un service REST, un token JWT, ou tout autre mécanisme d'authentification que vous utilisez
  //   // Pour cet exemple, je retourne simplement un objet avec des données statiques
  //   return {
  //     imageUrl: 'chemin_vers_image_utilisateur', // Remplacez 'chemin_vers_image_utilisateur' par l'URL réelle de l'image de l'utilisateur
  //     // Autres propriétés de l'utilisateur...
  //   };
  // }
  getIndicateur(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/taux-inferieurs`);
  }

}


