import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogAdopteesPageRoutingModule } from './dog-adoptees-routing.module';

import { DogAdopteesPage } from './dog-adoptees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogAdopteesPageRoutingModule
  ],
  declarations: [DogAdopteesPage]
})
export class DogAdopteesPageModule {}
