import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogAdopteesPage } from './dog-adoptees.page';

const routes: Routes = [
  {
    path: '',
    component: DogAdopteesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogAdopteesPageRoutingModule {}
