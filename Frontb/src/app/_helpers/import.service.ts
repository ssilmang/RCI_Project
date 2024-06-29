import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

 
  private apiUrl = 'http://127.0.0.1:8000/api/import';


  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();

    return this.http.post(this.apiUrl, formData, { headers }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Erreur inconnue';
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = `Erreur : ${error.error.message}`;
        } else {
          // Erreur côté serveur
          errorMessage = `Erreur HTTP : ${error.status}\nMessage : ${error.message}`;
        }
        console.error('Erreur lors de l\'envoi du fichier', error); // Journaliser les détails de l'erreur
        return throwError(errorMessage);
      })
    );
  }
}