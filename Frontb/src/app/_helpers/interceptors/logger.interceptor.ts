import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // console.log(token);
  // console.log(`Request is on its way to ${req.url}`);

  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  })
  return next(authReq);
  
};
