import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LayoutComponent } from '../layout/layout.component';
import { MenuAdminsComponent } from '../menu-admins/menu-admins.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../servicios/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { ModalEditarEmpleadoComponent } from '../modal-editar-empleado/modal-editar-empleado.component';

@Component({
  selector: 'app-ver-empleados',
  templateUrl: './ver-empleados.component.html',
  styleUrls: ['./ver-empleados.component.scss'],
  standalone:true,
  imports:[LayoutComponent,MenuAdminsComponent,CommonModule,IonicModule]
})
export class VerEmpleadosComponent  implements OnInit {

  empleados:any;

  constructor(private servicio:ApiService, private modal:ModalController) { }


  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(){
    this.servicio.get('getEmpleados').subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        this.empleados=response
        console.log(this.empleados);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }

  async abrirModalEditarEmpleado(empleado){
    const modal = await this.modal.create({
      component: ModalEditarEmpleadoComponent,
      componentProps: {
        'empleados': empleado
      }
    });
    await modal.present();
  }

  editarEmpleado(empleado:any){
    this.abrirModalEditarEmpleado(empleado);


    // Llamar al servicio que edita un empleado


  }

  eliminarEmpleado(empleado:any)
  {
    // Llamar al servicio que elimina un empleado


    

  }


}
