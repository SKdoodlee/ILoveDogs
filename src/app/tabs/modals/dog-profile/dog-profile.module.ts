import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogProfilePageRoutingModule } from './dog-profile-routing.module';

import { DogProfilePage } from './dog-profile.page';
import { EditDogPage } from '../edit-dog/edit-dog.page';
import { ContactDogpoundPage } from '../contact-dogpound/contact-dogpound.page';
import { ContactDogpoundPageModule } from '../contact-dogpound/contact-dogpound.module';
import { DogAdopteesPageModule } from '../dog-adoptees/dog-adoptees.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DogProfilePageRoutingModule,
    ContactDogpoundPageModule,
    DogAdopteesPageModule
  ],
  declarations: [DogProfilePage, EditDogPage],
  entryComponents: [EditDogPage, ContactDogpoundPage]
})
export class DogProfilePageModule {}
