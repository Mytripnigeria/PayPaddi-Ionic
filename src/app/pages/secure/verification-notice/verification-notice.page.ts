import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VerificationsPage } from '../settings/verifications/verifications.page';

@Component({
  selector: 'app-verification-notice',
  templateUrl: './verification-notice.page.html',
  styleUrls: ['./verification-notice.page.scss'],
})
export class VerificationNoticePage implements OnInit {
  type: null;
  constructor(
    private modalController: ModalController,
    private navparams: NavParams
  ) {}

  ngOnInit() {
    this.type = this.navparams.data.type;
  }

  async verify() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationsPage,
      cssClass: 'transfer-modal',
      swipeToClose: true,
    });

    await modal.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
