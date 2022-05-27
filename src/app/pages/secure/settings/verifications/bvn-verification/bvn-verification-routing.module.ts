import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BvnVerificationPage } from './bvn-verification.page';

const routes: Routes = [
  {
    path: '',
    component: BvnVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BvnVerificationPageRoutingModule {}
