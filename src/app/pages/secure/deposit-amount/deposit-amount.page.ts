import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.page.html',
  styleUrls: ['./deposit-amount.page.scss'],
})
export class DepositAmountPage implements OnInit {
  amount = null;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  continue() {
    this.modalController.dismiss({ amount: this.amount });
  }
  cancel() {
    this.modalController.dismiss();
  }
}
