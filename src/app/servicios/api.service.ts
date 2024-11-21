import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  url = "http://localhost:8000/";
  csrfToken: string = '';

  constructor(private http: HttpClient) { }

  // Método GET
  get(url: string) {
    return this.http.get(this.url + url);
  }
  getCsrfToken() {
    return this.http.get(this.url + 'csrf-token').pipe(
      tap((response: any) => {
        this.csrfToken = response.csrfToken; // Asegúrate de acceder correctamente al token
        console.log('Token CSRF:', this.csrfToken);
      }),
      catchError(error => {
        console.error('Error al obtener el token CSRF:', error);
        return throwError(error); // Manejo de errores
      })
    );
  }
  
  // Método POST
  post(url: string, form: any) {
    // Esperar a que se obtenga el token CSRF

        return this.http.post(this.url + url, form);

  }

  // Método DELETE
  delete(url: string, id: string) {
    return this.http.delete(this.url + url + "/" + id).toPromise()
      .then(response => {
        console.log('Eliminación exitosa:', response);
      })
      .catch(error => {
        console.error('Error al eliminar:', error);
        throw error; // Re-lanzar el error para manejarlo donde se llame
      });
  }
}
