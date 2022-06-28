import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationNoticePageRoutingModule } from './verification-notice-routing.module';

import { VerificationNoticePage } from './verification-notice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationNoticePageRoutingModule
  ],
  declarations: [VerificationNoticePage]
})
export class VerificationNoticePageModule {}
