import { RouterOutlet } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent  implements OnInit {

  

  menusYsubMenus: any[] = []; // Define como un array vacío

  ngOnInit(): void {
    this.getMenusySubmenus();
  }
  

  constructor(private ser:ApiService, private route:Router){

  }

  getMenusySubmenus(){
    // Llamar al servicio que obtiene los menús y submenús

   let token= localStorage.getItem('token');

    this.ser.get(`menusySubmenus/1`).subscribe({
      next: (response:any) => {
        this.menusYsubMenus=response;
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }

  navegarA(menu:string, submenu:string){
    this.route.navigate([`menu/${menu}/${submenu}`]);
    
   

  }

}
