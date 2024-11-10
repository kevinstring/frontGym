import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmpleadoComponent } from './menus/empleado/empleado.component';
import { ComprasComponent } from './menus/compras/compras.component';
import { ProductoComponent } from './menus/producto/producto.component';
import { ReportesComponent } from './menus/reportes/reportes.component';
import { TiendasComponent } from './menus/tiendas/tiendas.component';
import { VentasComponent } from './menus/ventas/ventas.component';

export const routes: Routes = [
    {
        path:"",component:LoginComponent
    },
    {
        path:"home",component: HomeComponent
    },
    {
        path:"menu/empleados/:submenu",component: EmpleadoComponent
    },
    {
        path:"menu/compras/:submenu",component: ComprasComponent
    },
    {
        path:"menu/producto/:submenu",component: ProductoComponent
    },
    {
        path:"menu/reportes/:submenu",component: ReportesComponent
    },
    {
        path:"menu/tiendas/:submenu",component: TiendasComponent
    },
    {
        path:"menu/ventas/:submenu",component: VentasComponent
    }
];
