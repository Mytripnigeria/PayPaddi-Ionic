import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyAirtimePageRoutingModule } from './buy-airtime-routing.module';

import { BuyAirtimePage } from './buy-airtime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BuyAirtimePageRoutingModule,
  ],
  declarations: [BuyAirtimePage],
})
export class BuyAirtimePageModule {}
