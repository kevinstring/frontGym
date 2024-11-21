import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-modal-editar-empleado',
  templateUrl: './modal-editar-empleado.component.html',
  styleUrls: ['./modal-editar-empleado.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,ReactiveFormsModule,FormsModule]
})
export class ModalEditarEmpleadoComponent  implements OnInit {

  @Input() empleados:any;

  roles:any;

  constructor(private modal:ModalController, private servicio:ApiService) { }

  ngOnInit() {
    console.log(this.empleados);
  }

  cerrar(){
    this.modal.dismiss();
  }

  getRoles(){

    this.servicio.get('getRoles').subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        this.roles=response.response
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    })

  }

  guardar(){
    // Llamar al servicio que edita un empleado
    let form = new FormData();
    form.append('nombre',this.empleados.nombre_usuario);
    form.append('apellido',this.empleados.apellido_usuario);
    form.append('rol',this.empleados.id_rol);
    form.append('id',this.empleados.id_usuario);
    form.append('correo',this.empleados.correo_usuario);
    form.append('direccion',this.empleados.direccion_usuario);

    this.servicio.post('editarEmpleado',form).subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí

      }
    });
    
  }

  eliminar(){
    // Llamar al servicio que elimina un empleado
  }

}
