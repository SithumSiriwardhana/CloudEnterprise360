import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ]
})
export class MaterialsModule { }
