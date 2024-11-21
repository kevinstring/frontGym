import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../../servicios/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-agregar-prod',
  templateUrl: './modal-agregar-prod.component.html',
  styleUrls: ['./modal-agregar-prod.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule]
})
export class ModalAgregarProdComponent  implements OnInit {

  subcategorias: any[] = [];
  producto:any = {}

  constructor(private modalCtrl: ModalController, private servicio:ApiService) { }

  ngOnInit() {
    this.getSubcategorias();
    this.getTokenCsrf();
  }

  cancel(){
    this.modalCtrl.dismiss();

  }

  getSubcategorias(){
    this.servicio.get('getSubcategorias').subscribe({
      next: (response:any) => {
        this.subcategorias=response;
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }

  getTokenCsrf(){
    this.servicio.get('csrf-token').subscribe({
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

  agregarProducto(){
    let form = new FormData();

    form.append('nombre_producto',this.producto.nombreProd)
    form.append('descripcion_producto',this.producto.descProd)
    form.append('dias_garantia',this.producto.diasProd)
    form.append('precio',this.producto.priceProd)
    form.append('id_sub_categoria',this.producto.idCat)
    form.append('img_url',this.producto.fotoUrl)
    form.append('vid_url',this.producto.videoUrl)
    form.append('cantidad',this.producto.cantProd)
    form.append('usuario_creo','10')
    this.servicio.post('agregarProducto', form).subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
        this.modalCtrl.dismiss();
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });
  }
}
