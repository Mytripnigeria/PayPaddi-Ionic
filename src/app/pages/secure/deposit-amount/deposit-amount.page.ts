import { CurrencyPipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.page.html',
  styleUrls: ['./deposit-amount.page.scss'],
})
export class DepositAmountPage implements OnInit {
  amount = null;
  amountHolder = null;
  constructor(
    private modalController: ModalController,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {}

  continue() {
    this.modalController.dismiss({ amount: this.amountHolder });
  }
  cancel() {
    this.modalController.dismiss();
  }

  keyPressNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  amountChange(ev) {
    console.log('the ev===>', ev);
    if (ev == '') return (this.amountHolder = null);
    ev = ev.replace(/,/g, '');
    this.amount = this.currencyPipe.transform(ev, '', '', '0.0-0');
    this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));
    // this.totalAmount = this.amountHolder +
  }
}
