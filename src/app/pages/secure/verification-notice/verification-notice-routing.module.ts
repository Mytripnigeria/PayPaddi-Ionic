import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationNoticePage } from './verification-notice.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationNoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationNoticePageRoutingModule {}
