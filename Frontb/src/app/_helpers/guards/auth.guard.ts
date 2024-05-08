import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = '';

  if (!token) {
    router.navigateByUrl('/login')
    return false;

  } else {
    return true;
  }

};
