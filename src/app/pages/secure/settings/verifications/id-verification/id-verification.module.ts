import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdVerificationPageRoutingModule } from './id-verification-routing.module';

import { IdVerificationPage } from './id-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IdVerificationPageRoutingModule,
  ],
  declarations: [IdVerificationPage],
})
export class IdVerificationPageModule {}
