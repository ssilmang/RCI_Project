import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logoutGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const service = inject(AuthService);
  const token = service.getAccessToken();

  if (token) {
    router.navigateByUrl('/dashboard')
    return false;

  } else {
    return true;
  }

};
