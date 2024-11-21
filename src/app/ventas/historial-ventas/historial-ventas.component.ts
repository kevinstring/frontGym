import { Component, OnInit } from '@angular/core';
import { MenuAdminsComponent } from '../../menu-admins/menu-admins.component';
import { LayoutComponent } from '../../layout/layout.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss'],
  standalone:true,
  imports:[MenuAdminsComponent,LayoutComponent,CommonModule,IonicModule]

})
export class HistorialVentasComponent  implements OnInit {

  historialVentas:any;
  constructor(private ser:ApiService

  ) { }

  ngOnInit() {
    this.obtenerLogVentas();
  }

  obtenerLogVentas(){
    this.ser.get('getLogVentas').subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        this.historialVentas=response.response
        console.log(this.historialVentas);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }


}
