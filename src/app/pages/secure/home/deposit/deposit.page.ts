import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  back() {
    this.modalCtrl.dismiss();
  }
}
