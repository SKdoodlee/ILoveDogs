import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDogProfilePage } from './create-dog-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDogProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDogProfilePageRoutingModule {}
