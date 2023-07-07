import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { PipesModule } from './pipes/pipes.module';
import { InterceptorAuthService } from './interceptors/interceptor-auth.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,HttpClientModule,
    AuthModule,
  ],
  exports:[

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAuthService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
