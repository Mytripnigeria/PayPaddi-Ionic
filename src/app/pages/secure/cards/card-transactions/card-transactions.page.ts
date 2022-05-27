import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-transactions',
  templateUrl: './card-transactions.page.html',
  styleUrls: ['./card-transactions.page.scss'],
})
export class CardTransactionsPage implements OnInit {
  content_loaded: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
