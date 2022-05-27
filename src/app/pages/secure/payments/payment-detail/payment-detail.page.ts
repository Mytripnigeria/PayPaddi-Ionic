import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  back() {
    this.modalCtrl.dismiss();
  }
}
