import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveSubmissionsPageRoutingModule } from './active-submissions-routing.module';

import { ActiveSubmissionsPage } from './active-submissions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveSubmissionsPageRoutingModule
  ],
  declarations: [ActiveSubmissionsPage]
})
export class ActiveSubmissionsPageModule {}
