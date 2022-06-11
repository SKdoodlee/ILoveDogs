import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangepassPageRoutingModule } from './changepass-routing.module';

import { ChangepassPage } from './changepass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangepassPageRoutingModule
  ],
  declarations: [ChangepassPage]
})
export class ChangepassPageModule {}
