import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTransferPageRoutingModule } from './wallet-transfer-routing.module';

import { WalletTransferPage } from './wallet-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WalletTransferPageRoutingModule,
  ],
  declarations: [WalletTransferPage],
})
export class WalletTransferPageModule {}
