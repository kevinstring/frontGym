import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Necesitas inyectar el Router para redirecciones

  // Verifica si existe el token en el localStorage
  const userId = localStorage.getItem('id_usuario');
  if (userId && !isNaN(Number(userId))) {
    console.log("HOLA")
    return true; // Permite el acceso si el token existe y es un número válido
  }
  
  // Si no hay token, redirige al login
  router.navigate(['/login']);
  return false;
};
