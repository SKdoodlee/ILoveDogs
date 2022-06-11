import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDogProfilePageRoutingModule } from './create-dog-profile-routing.module';

import { CreateDogProfilePage } from './create-dog-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateDogProfilePageRoutingModule
  ],
  declarations: [CreateDogProfilePage]
})
export class CreateDogProfilePageModule {}
