import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitsPage } from './limits.page';

const routes: Routes = [
  {
    path: '',
    component: LimitsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitsPageRoutingModule {}
