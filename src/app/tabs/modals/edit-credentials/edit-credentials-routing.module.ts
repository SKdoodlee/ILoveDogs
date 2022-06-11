import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCredentialsPage } from './edit-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: EditCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCredentialsPageRoutingModule {}
