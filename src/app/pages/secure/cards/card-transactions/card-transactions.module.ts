import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardTransactionsPageRoutingModule } from './card-transactions-routing.module';

import { CardTransactionsPage } from './card-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardTransactionsPageRoutingModule
  ],
  declarations: [CardTransactionsPage]
})
export class CardTransactionsPageModule {}
