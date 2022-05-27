import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatementsReportPage } from './statements-report.page';

const routes: Routes = [
  {
    path: '',
    component: StatementsReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatementsReportPageRoutingModule {}
