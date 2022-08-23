import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositAmountPageRoutingModule } from './deposit-amount-routing.module';

import { DepositAmountPage } from './deposit-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositAmountPageRoutingModule
  ],
  declarations: [DepositAmountPage]
})
export class DepositAmountPageModule {}
