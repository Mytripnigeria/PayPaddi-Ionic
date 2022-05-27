import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatementsReportPageRoutingModule } from './statements-report-routing.module';

import { StatementsReportPage } from './statements-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatementsReportPageRoutingModule
  ],
  declarations: [StatementsReportPage]
})
export class StatementsReportPageModule {}
