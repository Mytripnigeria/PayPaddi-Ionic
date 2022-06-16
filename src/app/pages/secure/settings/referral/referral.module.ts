import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { IonicModule } from '@ionic/angular';

import { ReferralPageRoutingModule } from './referral-routing.module';

import { ReferralPage } from './referral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    IonicModule,
    ReferralPageRoutingModule,
  ],
  declarations: [ReferralPage],
})
export class ReferralPageModule {}
