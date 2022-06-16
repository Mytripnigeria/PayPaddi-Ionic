import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletTransferPage } from './wallet-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: WalletTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletTransferPageRoutingModule {}
