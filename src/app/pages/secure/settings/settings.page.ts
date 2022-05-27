import { VerificationsPage } from './verifications/verifications.page';
import { Platform, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UpdatePinPage } from './update-pin/update-pin.page';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private authService: AuthService,
    public platform: Platform
  ) {}

  ngOnInit() {}

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
