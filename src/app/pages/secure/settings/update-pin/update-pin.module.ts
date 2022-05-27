import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePinPageRoutingModule } from './update-pin-routing.module';

import { UpdatePinPage } from './update-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatePinPageRoutingModule,
  ],
  declarations: [UpdatePinPage],
})
export class UpdatePinPageModule {}
