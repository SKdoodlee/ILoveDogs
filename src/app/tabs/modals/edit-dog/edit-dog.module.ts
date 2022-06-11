import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDogPageRoutingModule } from './edit-dog-routing.module';

import { EditDogPage } from './edit-dog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditDogPageRoutingModule
  ],
  declarations: [EditDogPage]
})
export class EditDogPageModule {}
