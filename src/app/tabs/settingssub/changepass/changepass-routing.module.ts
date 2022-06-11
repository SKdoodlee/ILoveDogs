import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepassPage } from './changepass.page';

const routes: Routes = [
  {
    path: '',
    component: ChangepassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangepassPageRoutingModule {}
