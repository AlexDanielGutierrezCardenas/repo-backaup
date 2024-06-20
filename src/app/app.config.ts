import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"angular-auth-56ebf","appId":"1:1083625229483:web:3affb06e3922c98c387bee","storageBucket":"angular-auth-56ebf.appspot.com","apiKey":"AIzaSyBFyADrFK7StqQgoXT3WWtP8fdF3u4JE2U","authDomain":"angular-auth-56ebf.firebaseapp.com","messagingSenderId":"1083625229483"})), provideAuth(() => getAuth()), provideStorage(() => getStorage())
  ]
  
};
