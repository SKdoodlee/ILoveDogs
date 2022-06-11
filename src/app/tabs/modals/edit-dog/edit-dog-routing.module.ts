import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDogPage } from './edit-dog.page';

const routes: Routes = [
  {
    path: '',
    component: EditDogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDogPageRoutingModule {}
