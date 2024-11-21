import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmpleadoComponent } from './menus/empleado/empleado.component';
import { ComprasComponent } from './menus/compras/compras.component';
import { ProductoComponent } from './menus/producto/producto.component';
import { ReportesComponent } from './menus/reportes/reportes.component';
import { TiendasComponent } from './menus/tiendas/tiendas.component';
import { VentasComponent } from './menus/ventas/ventas.component';
import { ListaProductosComponent } from './listas/lista-productos/lista-productos.component';
import { ModalRegistrarVentaNuevaComponent } from './modales/modal-registrar-venta-nueva/modal-registrar-venta-nueva.component';
import { HistorialVentasComponent } from './ventas/historial-ventas/historial-ventas.component';
import { VerEmpleadosComponent } from './ver-empleados/ver-empleados.component';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard] // Protege esta ruta
  },
  {
    path: 'menu/empleados/:submenu',
    component: EmpleadoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/compras/:submenu',
    component: ComprasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/producto/:submenu',
    component: ProductoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/reportes/:submenu',
    component: ReportesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/tiendas/:submenu',
    component: TiendasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/ventas/:submenu',
    component: VentasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'verProductos',
    component: ListaProductosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'registrarVenta',
    component: ModalRegistrarVentaNuevaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'historialVentas',
    component: HistorialVentasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'verEmpleados',
    component: VerEmpleadosComponent,
    canActivate: [authGuard]
  }
];

