import { ICard } from './../../../../models/cards';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.page.html',
  styleUrls: ['./card-details.page.scss'],
})
export class CardDetailsPage implements OnInit {
  card: ICard;
  constructor(
    private modalCtrl: ModalController,
    private navParam: NavParams
  ) {}

  ngOnInit() {
    this.card = this.navParam.data.payload;
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
