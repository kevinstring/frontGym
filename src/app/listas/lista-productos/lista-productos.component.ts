import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { CommonModule } from '@angular/common';
import { MenuAdminsComponent } from '../../menu-admins/menu-admins.component';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
  standalone:true,
  imports:[CommonModule,MenuAdminsComponent,LayoutComponent,MenuAdminsComponent]
})
export class ListaProductosComponent  implements OnInit {
  productos: any;

  constructor(private servicio:ApiService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(){
    this.servicio.get('getProductos').subscribe({
      next: (response:any) => {
        this.productos=response.response;
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }

}
