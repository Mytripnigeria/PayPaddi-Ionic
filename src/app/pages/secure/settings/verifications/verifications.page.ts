import { IUser } from './../../../../models/user';
import { DataService } from './../../../../services/data/data.service';
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
  userData: IUser;
  constructor(
    private modalController: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.userData = this.dataService.getUserProfile();
    console.log(this.userData);
  }

  back() {
    this.modalController.dismiss();
  }

  async verifyEmail() {
    const modal = await this.modalController.create({
      component: VerificationPage,
      swipeToClose: true,
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.email) {
      this.userData.is_email_verify = 1;
      this.dataService.commitUser();
    }
  }
  async verifyBVN() {
    const modal = await this.modalController.create({
      component: BvnVerificationPage,
      swipeToClose: true,
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.kyc1) {
      this.userData.is_kyc1_verify = 1;
      this.dataService.commitUser();
    }
  }
  async verifyID() {
    const modal = await this.modalController.create({
      component: IdVerificationPage,
      cssClass: 'transfer-modal',
      swipeToClose: true,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.kyc2) {
      this.userData.is_kyc2_verify = 1;
      this.dataService.commitUser();
    }
  }
}
