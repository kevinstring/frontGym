import { Component,OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";
import { MenuAdminsComponent } from "../menu-admins/menu-admins.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LayoutComponent, LayoutComponent, MenuAdminsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  menusYsubMenus: any[] = []; // Define como un array vacío

  ngOnInit(): void {
  }
  

  constructor(private ser:ApiService, private route:Router){

  }


  saludar(){
    alert('Hola');
  }

}
