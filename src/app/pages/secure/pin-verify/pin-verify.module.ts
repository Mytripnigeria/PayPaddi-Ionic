import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinVerifyPageRoutingModule } from './pin-verify-routing.module';

import { PinVerifyPage } from './pin-verify.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PinVerifyPageRoutingModule,
  ],
  declarations: [PinVerifyPage],
})
export class PinVerifyPageModule {}
