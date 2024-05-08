import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = '';

  if (token) {
    router.navigateByUrl('/accueil')
    return false;

  } else {
    return true;
  }
};
