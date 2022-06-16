import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinVerifyPage } from './pin-verify.page';

const routes: Routes = [
  {
    path: '',
    component: PinVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinVerifyPageRoutingModule {}
