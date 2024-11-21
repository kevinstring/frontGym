import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalAgregarProdComponent } from '../modales/modal-agregar-prod/modal-agregar-prod.component';
import { ModalRegistrarVentaNuevaComponent } from '../modales/modal-registrar-venta-nueva/modal-registrar-venta-nueva.component';
import { PdfmakeModule } from 'ng-pdf-make';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import html2canvas from 'html2canvas';

@Component({
  selector: 'app-menu-admins',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './menu-admins.component.html',
  styleUrl: './menu-admins.component.css'
})
export class MenuAdminsComponent implements OnInit {

  
esconderMenuAdmins: boolean = false;
  menusYsubMenus: any[] = []; // Define como un array vacío
  reporteVentas: any;

  ngOnInit(): void {
    this.getMenusySubmenus();
  }
  

  constructor(private ser:ApiService, private route:Router,private modalCtrl: ModalController
    ,private modalcr:ModalController
  ){

  }

  getMenusySubmenus(){
    // Llamar al servicio que obtiene los menús y submenús

   let token= localStorage.getItem('rol');
   if(token=="5"){
      this.esconderMenuAdmins=true;
      return
   }

    this.ser.get(`menusySubmenus/${token}`).subscribe({
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
  async openModalProduto() {
    const modal = await this.modalCtrl.create({
      component: ModalAgregarProdComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }



  irASubMenu(idMenu:string,abrirModal:string){
    if(abrirModal=="1" && idMenu=="12"){
      this.openModalProduto();

      } 
      if(abrirModal=="0" && idMenu=="15"){
        this.route.navigate(['verProductos']); 

     }

     if(abrirModal=="1" && idMenu=="1"){
     
      this.route.navigate([

        'registrarVenta'
      ])
      
     }
     if(abrirModal=="0" && idMenu=="5"){
     
      this.route.navigate([

        'historialVentas'
      ])
      
     }
      if(abrirModal=="0" && idMenu=="18"){
      
        this.route.navigate([
  
          'verEmpleados'
        ])
        
      }

      if(abrirModal=="0" && idMenu=="22"){
      this.ser.get('generarReporteVenta').subscribe({
        next: (response:any) => {
          console.log('Respuesta recibida:', response);
          this.reporteVentas=response;
          this.generatePDF()

          // Maneja la respuesta aquí
        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
          // Maneja el error aquí
        }
      });
        
      }
    }


    generatePDF() {
      const doc = new jsPDF();
      const title = 'Reporte de Usuarios';
  
      // Agregar título
      doc.setFontSize(18);
      doc.text(title, 10, 10);
  
      // Configurar columnas y filas
      const columns = ['ID Venta', 'Nombre Cliente', 'Apellido Cliente', 'Fecha Venta', 'Tipo Entrega'];

    // Convertir JSON a filas
    const rows = this.reporteVentas.map(item => [
      item.id_venta,
      item.nombre_cliente,
      item.apellido_cliente,
      item.fecha_venta,
      item.tipo_entrega
    ]);
  
      // Generar tabla
      (doc as any).autoTable({
        head: [columns], // Encabezados de la tabla
        body: rows,      // Datos del JSON
        startY: 20       // Posición inicial
      });
  
      // Guardar el PDF
      doc.save('usuarios.pdf');
    }

}
