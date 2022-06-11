import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteProfilePageRoutingModule } from './delete-profile-routing.module';

import { DeleteProfilePage } from './delete-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteProfilePageRoutingModule
  ],
  declarations: [DeleteProfilePage]
})
export class DeleteProfilePageModule {}
