import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankTransferPageRoutingModule } from './bank-transfer-routing.module';

import { BankTransferPage } from './bank-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BankTransferPageRoutingModule,
  ],
  declarations: [BankTransferPage],
})
export class BankTransferPageModule {}
