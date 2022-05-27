import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UpdatePinPage } from './../update-pin/update-pin.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async updatePin() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: UpdatePinPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }
}
