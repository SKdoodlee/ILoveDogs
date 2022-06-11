import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveSubmissionsPage } from './active-submissions.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveSubmissionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveSubmissionsPageRoutingModule {}
