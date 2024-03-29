import { EventsService } from './../services/events.service';
import { HomePage } from './../pages/secure/home/home.page';
import { DataService } from './../services/data/data.service';
import { BankTransferPage } from './../pages/secure/bank-transfer/bank-transfer.page';
import { Component } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  IonRouterOutlet,
  AlertController,
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
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet,
    private dataService: DataService,
    private eventService: EventsService
  ) {}

  // Select action
  async selectAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Type of transfer',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'PayPaddi Wallet',
          icon: 'wallet',
          handler: () => {
            this.sendToWallet();
          },
        },
        {
          text: 'Bank Account',
          icon: 'storefront',
          handler: () => {
            // Put in logic ...
            this.sendToBank();
          },
        },
        {
          text: 'CrossBorder',
          icon: 'earth',
          handler: () => {
            // Put in logic ...
            this.schedules();
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

  async schedules() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Coming Soon!!!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async sendToWallet() {
    const userData = this.dataService.getUserProfile();
    if (userData.is_email_verify && userData.is_kyc1_verify) {
      // Open filter modal
      const modal = await this.modalController.create({
        component: WalletTransferPage,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();

      // Apply filter from modal
      let { data } = await modal.onWillDismiss();
      if (data && data.reload) {
        // await this.home.getUserWallet();
        this.eventService.notify({
          reloadDashboard: true,
        });
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
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();

      // Apply filter from modal
      let { data } = await modal.onWillDismiss();
      if (data && data.reload) {
        // await this.home.getUserWallet();
        this.eventService.notify({
          reloadDashboard: true,
        });
      }
    } else {
      this.verifyNotice('kyc');
    }
  }
}
