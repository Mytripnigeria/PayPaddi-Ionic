import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardTransactionsPage } from './card-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: CardTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardTransactionsPageRoutingModule {}
