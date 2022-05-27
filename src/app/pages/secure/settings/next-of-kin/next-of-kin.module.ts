import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NextOfKinPageRoutingModule } from './next-of-kin-routing.module';

import { NextOfKinPage } from './next-of-kin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NextOfKinPageRoutingModule,
  ],
  declarations: [NextOfKinPage],
})
export class NextOfKinPageModule {}
