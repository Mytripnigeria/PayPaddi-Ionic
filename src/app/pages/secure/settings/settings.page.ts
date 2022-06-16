import { IUser } from './../../../models/user';
import { DataService } from './../../../services/data/data.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { UserService } from './../../../services/user/user.service';
import { VerificationsPage } from './verifications/verifications.page';
import { Platform, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UpdatePinPage } from './update-pin/update-pin.page';
import { Browser } from '@capacitor/browser';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  userData: IUser;
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private authService: AuthService,
    public platform: Platform,
    private util: UtilityService,
    private dataService: DataService,
    private actRoute: ActivatedRoute
  ) {
    console.log('setting view enter');
  }

  ionViewWillEnter() {
    this.actRoute.queryParams.subscribe((val) => {
      console.log('setting view enter');
      this.userData = this.dataService.getUserProfile();
      console.log(this.userData);
    });
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }
  async updatePin() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: UpdatePinPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  async verification() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  async terms() {
    await Browser.open({ url: 'https://google.com/' });
  }
}
