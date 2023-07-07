import { MaterialModule } from './../material/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { PipesModule } from '../pipes/pipes.module';
import { TablesComponent } from './tables/tables.component';




@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    TablesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PipesModule
  ],
  exports:[
    NavbarComponent,
    HeaderComponent,
    TablesComponent
  ],
})
export class SharedModule { }
