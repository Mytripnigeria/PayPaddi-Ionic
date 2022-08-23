import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositAmountPage } from './deposit-amount.page';

const routes: Routes = [
  {
    path: '',
    component: DepositAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositAmountPageRoutingModule {}
