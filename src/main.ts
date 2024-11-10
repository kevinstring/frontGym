import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
bootstrapApplication(AppComponent, {
  providers: [
    {provide:LocationStrategy,useClass: HashLocationStrategy},


    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    

  ],
});
