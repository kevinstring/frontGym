import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MenuAdminsComponent } from '../../menu-admins/menu-admins.component';
import { LayoutComponent } from '../../layout/layout.component';
import { ApiService } from '../../servicios/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-registrar-venta-nueva',
  templateUrl: './modal-registrar-venta-nueva.component.html',
  styleUrls: ['./modal-registrar-venta-nueva.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,MenuAdminsComponent,LayoutComponent,ReactiveFormsModule,FormsModule]
})
export class ModalRegistrarVentaNuevaComponent  implements OnInit {
  tipos:any;
  tipoPago:any;
precioTotal:number=0;
  factura:any={
    nit_cliente:null,
    tipo_entrega:null,
    id_venta:null
  }
  desabilitarBoton:boolean=false;
  productoIngresado:any={
    cantidad:null,
    nombre_producto:null,
    precio:null
  };
  registro: any = {
    idProducto: null,
    cantidad: null,
    monto: null,
    montoTarjeta:null,
    montoEfectivo:null
  };
  facturaIniciada:boolean=false;
  constructor(private service:ApiService) { }

  ngOnInit() {
    this.getTiposEntrega();
  }

  getTiposEntrega(){

    this.service.get('getTiposEntrega').subscribe({
      next: (response:any) => {
        this.tipos=response.response; 
        console.log('Respuesta recibida:', response);
        // Maneja la respuesta aquí
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Maneja el error aquí
      }
    });

  }

  ingresarNuevaCompra(){
    this.facturaIniciada=false;
    if(this.factura.nit_cliente==null || this.factura.tipo_entrega==null){
      alert('Debe llenar todos los campos');
      return;
    }

    let form = new FormData();
    form.append('nit_cliente',this.factura.nit_cliente);
    form.append('tipo_entrega',this.factura.tipo_entrega);

    this.service.post('ingresarNuevaCompra',form).subscribe({
      next: (response:any) => {
        this.facturaIniciada=true;
        console.log('Respuesta recibida:', response);
        this.factura=response;

      },
      error: (error) => {
            this.facturaIniciada=false;
        console.error('Ocurrió un error:', error);
      }
    });


  }

  agregarProducto(){
    console.log(this.registro)
    // if(this.registro.id_producto==null || this.registro.cantidad==null){
    //   alert('Debe llenar todos los campos');
    //   return;
    // }

    let form = new FormData();
    form.append('id_producto',this.registro.idProducto);
    form.append('cantidad',this.registro.cantidad);
    form.append('id_factura',this.factura.id_venta);

    this.service.post('agregarProductoVenta',form).subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
       this.productoIngresado=response;
       this.precioTotal=response.total;

      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
      }
    });

  }

  eliminarProducto(id_producto:string){
    let form = new FormData();
    form.append('id_producto',id_producto);
    form.append('id_venta',this.factura.id_venta);

    this.service.post('eliminarProductoVenta',form).subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        this.agregarProducto();

      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
      }
    });
  }

  finalizarVenta(){
    let form = new FormData();
    form.append('id_venta',this.factura.id_venta);
    form.append('monto',this.precioTotal.toString());
    form.append('montoTarjeta',this.registro.montoTarjeta);
    form.append('montoEfectivo',this.registro.montoEfectivo);
    form.append('tipoPago',this.tipoPago);

    this.service.post('finalizarVenta',form).subscribe({
      next: (response:any) => {
        console.log('Respuesta recibida:', response);
        this.facturaIniciada=false;
        this.factura={};
        this.productoIngresado={};
        this.registro={};
        this.precioTotal=0;
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
      }
    });
  }

  obtenerTipoPago(){
    console.log(this.tipoPago)

  }

  calculoEfectivo(){

    if(this.registro.montoEfectivo==null || this.registro.montoEfectivo!==this.precioTotal){
      this.desabilitarBoton=true;
      return
    }else{
      this.desabilitarBoton=false;

    }

    // this.registro.montoTarjeta=this.precioTotal-this.registro.montoEfectivo;
  }
  calculoTarjeta(){
    this.desabilitarBoton=false;
      
      if(this.registro.montoTarjeta==null || this.registro.montoTarjeta!==this.precioTotal){
        this.desabilitarBoton=true;
        return
      }else{
        this.desabilitarBoton=false;
  
      }
  
      // this.registro.montoEfectivo=this.precioTotal-this.registro.montoTarjeta;
    }

    calcularMixtoEfectivo(){
      this.desabilitarBoton=false;
      if(this.registro.montoEfectivo==null || this.registro.montoEfectivo>this.precioTotal){
        this.desabilitarBoton=true;
        return
      }else{
        this.desabilitarBoton=false;
  
      }
  
      this.registro.montoTarjeta=this.precioTotal-this.registro.montoEfectivo;
    }

    calcularMixtoTarjeta(){
      this.desabilitarBoton=false;
      if(this.registro.montoTarjeta==null || this.registro.montoTarjeta>this.precioTotal){
        this.desabilitarBoton=true;
        return
      }else{
        this.desabilitarBoton=false;
  
      }
  
      this.registro.montoEfectivo=this.precioTotal-this.registro.montoTarjeta;
    }

}
