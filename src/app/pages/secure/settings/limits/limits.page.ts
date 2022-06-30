import { TransferService } from './../../../../services/transfer/transfer.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { VerificationsPage } from '../verifications/verifications.page';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.page.html',
  styleUrls: ['./limits.page.scss'],
})
export class LimitsPage implements OnInit {
  limits: any;
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.limits = this.dataService.getTransferLimit();
    console.log(this.limits);
  }

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
