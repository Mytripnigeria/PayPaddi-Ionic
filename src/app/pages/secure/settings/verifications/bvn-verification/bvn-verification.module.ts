import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BvnVerificationPageRoutingModule } from './bvn-verification-routing.module';

import { BvnVerificationPage } from './bvn-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BvnVerificationPageRoutingModule,
  ],
  declarations: [BvnVerificationPage],
})
export class BvnVerificationPageModule {}
