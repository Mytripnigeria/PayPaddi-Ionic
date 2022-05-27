import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { VerificationsPage } from '../verifications/verifications.page';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.page.html',
  styleUrls: ['./limits.page.scss'],
})
export class LimitsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

  async upgrade() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }
}
