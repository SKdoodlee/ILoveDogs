import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeprofilePage } from './seeprofile.page';

const routes: Routes = [
  {
    path: '',
    component: SeeprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeprofilePageRoutingModule {}
