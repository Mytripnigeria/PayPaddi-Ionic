import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../../tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'styleguide',
    loadChildren: () =>
      import('./styleguide/styleguide.module').then(
        (m) => m.StyleguidePageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'settings/profile/edit',
    loadChildren: () =>
      import('./profile/edit/edit.module').then((m) => m.EditPageModule),
  },
  {
    path: 'payments/detail',
    loadChildren: () =>
      import('./payments/payment-detail/payment-detail.module').then(
        (m) => m.PaymentDetailPageModule
      ),
  },
  {
    path: 'wallet-transfer',
    loadChildren: () =>
      import('./wallet-transfer/wallet-transfer.module').then(
        (m) => m.WalletTransferPageModule
      ),
  },
  {
    path: 'bank-transfer',
    loadChildren: () =>
      import('./bank-transfer/bank-transfer.module').then(
        (m) => m.BankTransferPageModule
      ),
  },

  {
    path: 'pin-verify',
    loadChildren: () =>
      import('./pin-verify/pin-verify.module').then(
        (m) => m.PinVerifyPageModule
      ),
  },
  {
    path: 'bank-list',
    loadChildren: () =>
      import('./bank-list/bank-list.module').then((m) => m.BankListPageModule),
  },
  {
    path: 'buy-airtime',
    loadChildren: () =>
      import('./buy-airtime/buy-airtime.module').then(
        (m) => m.BuyAirtimePageModule
      ),
  },
  {
    path: 'verification-notice',
    loadChildren: () => import('./verification-notice/verification-notice.module').then( m => m.VerificationNoticePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
