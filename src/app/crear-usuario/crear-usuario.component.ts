import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit{
  constructor(private ser:ApiService){

  }
ngOnInit(): void {
  this.getRoles()

}

getRoles(){
  
  this.ser.get('getRoles').subscribe({
    next: (response) => {
      console.log('Respuesta recibida:', response);
      // Aquí procesas la respuesta cuando llega correctamente.
    },
    error: (error) => {
      console.error('Ocurrió un error:', error);
      // Aquí manejas el error en caso de que la petición falle.
    },
    complete: () => {
      console.log('Petición completada');
      // Este bloque se ejecuta cuando el observable termina, 
      // útil para hacer algo al final, incluso si falló o fue exitoso.
    }
  });
  
  }
}

