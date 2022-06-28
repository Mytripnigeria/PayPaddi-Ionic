import { DataService } from './../services/data/data.service';
import { BankTransferPage } from './../pages/secure/bank-transfer/bank-transfer.page';
import { Component } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  IonRouterOutlet,
} from '@ionic/angular';
import { WalletTransferPage } from '../pages/secure/wallet-transfer/wallet-transfer.page';
import { VerificationsPage } from '../pages/secure/settings/verifications/verifications.page';
import { VerificationNoticePage } from '../pages/secure/verification-notice/verification-notice.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private dataService: DataService
  ) {}

  // Select action
  async selectAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Type of transfer',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Send to wallet',
          icon: 'wallet',
          handler: () => {
            this.sendToWallet();
          },
        },
        {
          text: 'Send to local bank',
          icon: 'storefront',
          handler: () => {
            // Put in logic ...
            this.sendToBank();
          },
        },
        {
          text: 'Crossborder transfer',
          icon: 'earth',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async sendToWallet() {
    const userData = this.dataService.getUserProfile();
    if (userData.is_email_verify && userData.is_kyc1_verify) {
      // Open filter modal
      const modal = await this.modalController.create({
        component: WalletTransferPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();

      // Apply filter from modal
      let { data } = await modal.onWillDismiss();
      if (data && data.reload) {
        // await this.home.getUserWallet();
      }
    } else {
      this.verifyNotice('kyc');
    }
  }

  async verify() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  async verifyNotice(type) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationNoticePage,
      componentProps: { type },
      swipeToClose: true,
      cssClass: 'transfer-modal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.verify) {
      this.verify();
    }
  }

  async sendToBank() {
    const userData = this.dataService.getUserProfile();
    if (userData.is_email_verify && userData.is_kyc1_verify) {
      const modal = await this.modalController.create({
        component: BankTransferPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();

      // Apply filter from modal
      let { data } = await modal.onWillDismiss();
      if (data && data.reload) {
        // await this.home.getUserWallet();
      }
    } else {
      this.verifyNotice('kyc');
    }
  }
}
