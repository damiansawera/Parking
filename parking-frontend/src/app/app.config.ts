import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimationsAsync('noop'),
              provideHttpClient(),
              provideAnimationsAsync('noop'),
              provideAnimationsAsync(),
              provideAnimationsAsync(),
              provideAnimationsAsync(),
              provideAnimationsAsync(),
              importProvidersFrom(FormsModule),
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
};
