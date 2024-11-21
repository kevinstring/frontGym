import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import {  FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  
  constructor(private ser:ApiService,private route:Router){

  }

  formu={
    correo:"",
    password:""
  }

ngOnInit(): void {
    
}

submit() {
  let form = new FormData();
  form.append('correo', this.formu.correo);
  form.append('password', this.formu.password);

  this.ser.post('login', form).subscribe({
    next: (response:any) => {
      console.log('Respuesta recibida:', response.response);
      if(response.success){
      localStorage.setItem('id_usuario', response.id_usuario);
      localStorage.setItem('rol', response.id_rol);
      console.log();
      this.route.navigate(['/']);
    }else{
        alert('Usuario o contraseña incorrectos');
      }
      // Maneja la respuesta aquí
    },
    error: (error) => {
      console.error('Ocurrió un error:', error);
      // Maneja el error aquí
    }
  });
}


}
