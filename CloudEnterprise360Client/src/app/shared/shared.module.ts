import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    MaterialsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
