import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactDogpoundPageRoutingModule } from './contact-dogpound-routing.module';

import { ContactDogpoundPage } from './contact-dogpound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactDogpoundPageRoutingModule
  ],
  declarations: [ContactDogpoundPage]
})
export class ContactDogpoundPageModule {}
