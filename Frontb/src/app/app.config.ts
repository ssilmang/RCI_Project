import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // provideCharts(withDefaultRegisterables()),
    // {
    //   provide: TranslateLoader,
    //   useFactory: HttpLoaderFactory,
    //   deps: [HttpClient]
    // },
    // TranslateService,z


  ],
};
