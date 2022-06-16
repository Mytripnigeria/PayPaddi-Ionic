import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ICardTransaction } from 'src/app/models/cardTransaction';
import { CardsService } from 'src/app/services/cards/cards.service';

@Component({
  selector: 'app-card-transactions',
  templateUrl: './card-transactions.page.html',
  styleUrls: ['./card-transactions.page.scss'],
})
export class CardTransactionsPage implements OnInit {
  transactions: ICardTransaction[];
  payload;

  constructor(
    private navParam: NavParams,
    private cardsService: CardsService,
    private modalController: ModalController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.payload = this.navParam.data.payload;
    this.getCardTransctions();
  }

  cancel() {
    this.modalController.dismiss();
  }

  async getCardTransctions() {
    const reqPayload = {
      virtual_card_id: this.payload.virtual_card_id,
      from: '2020-01-01',
      to: '2100-01-01',
      index: 1,
      size: 500,
    };
    const response = await this.cardsService.getCardTransactions(reqPayload);
    if (response.result) {
      if (response.result.data.status == 'success') {
        this.transactions = response.result.data.data;
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to retrieve transactions',
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to retrieve transactions',
        2000
      );
    }
  }
}
