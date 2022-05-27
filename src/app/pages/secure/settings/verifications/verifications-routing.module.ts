import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationsPage } from './verifications.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationsPage
  },
  {
    path: 'bvn-verification',
    loadChildren: () => import('./bvn-verification/bvn-verification.module').then( m => m.BvnVerificationPageModule)
  },
  {
    path: 'id-verification',
    loadChildren: () => import('./id-verification/id-verification.module').then( m => m.IdVerificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationsPageRoutingModule {}
