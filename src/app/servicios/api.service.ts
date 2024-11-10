import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  url = "http://localhost:8000/";

  constructor(private http: HttpClient) { }

  // Método GET
  get(url: string) {
    return this.http.get(this.url + url);
  }

  // Método POST
  post(url: string, form: any) {
    // Obtener el token CSRF del meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    // Configurar las cabeceras
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': csrfToken ? csrfToken : '',
      'Content-Type': 'application/json', // Puedes cambiar el tipo según lo que envíes
    });

    return this.http.post(this.url + url, form, { headers });
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
