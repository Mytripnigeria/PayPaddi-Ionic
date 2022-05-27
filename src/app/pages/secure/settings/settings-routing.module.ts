import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountPageModule),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesPageModule),
  },
  {
    path: 'limits',
    loadChildren: () =>
      import('./limits/limits.module').then((m) => m.LimitsPageModule),
  },
  {
    path: 'update-pin',
    loadChildren: () =>
      import('./update-pin/update-pin.module').then(
        (m) => m.UpdatePinPageModule
      ),
  },
  {
    path: 'next-of-kin',
    loadChildren: () =>
      import('./next-of-kin/next-of-kin.module').then(
        (m) => m.NextOfKinPageModule
      ),
  },
  {
    path: 'verifications',
    loadChildren: () => import('./verifications/verifications.module').then( m => m.VerificationsPageModule)
  },
  {
    path: 'statements-report',
    loadChildren: () => import('./statements-report/statements-report.module').then( m => m.StatementsReportPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./referral/referral.module').then( m => m.ReferralPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
