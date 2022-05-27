import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitsPageRoutingModule } from './limits-routing.module';

import { LimitsPage } from './limits.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LimitsPageRoutingModule],
  declarations: [LimitsPage],
})
export class LimitsPageModule {}
