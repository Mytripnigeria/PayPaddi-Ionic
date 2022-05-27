import { IdVerificationPage } from './id-verification/id-verification.page';
import { BvnVerificationPage } from './bvn-verification/bvn-verification.page';
import { VerificationPage } from './../../home/verification/verification.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.page.html',
  styleUrls: ['./verifications.page.scss'],
})
export class VerificationsPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  back() {
    this.modalController.dismiss();
  }

  async verifyEmail() {
    const modal = await this.modalController.create({
      component: VerificationPage,
      swipeToClose: true,
    });

    await modal.present();
  }
  async verifyBVN() {
    const modal = await this.modalController.create({
      component: BvnVerificationPage,
      swipeToClose: true,
    });

    await modal.present();
  }
  async verifyID() {
    const modal = await this.modalController.create({
      component: IdVerificationPage,
      swipeToClose: true,
    });

    await modal.present();
  }
}
