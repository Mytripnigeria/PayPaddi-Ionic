import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundCardPageRoutingModule } from './fund-card-routing.module';

import { FundCardPage } from './fund-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FundCardPageRoutingModule,
  ],
  declarations: [FundCardPage],
})
export class FundCardPageModule {}
