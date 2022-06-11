import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogProfilePage } from './dog-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DogProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogProfilePageRoutingModule {}
