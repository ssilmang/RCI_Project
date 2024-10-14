import { HttpClient, HttpErrorResponse,HttpEvent, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

 
  private apiUrl = 'http://127.0.0.1:8000/api/import'; // URL de votre API Laravel pour l'importation

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
         
          return event; 
        } else if (event.type === HttpEventType.Response) {
          
          return event;
        }
        return event; 
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue lors de l\'importation:', error);
    throw error;
  }


  
}