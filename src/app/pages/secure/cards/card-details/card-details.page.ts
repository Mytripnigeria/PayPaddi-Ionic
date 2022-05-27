import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.page.html',
  styleUrls: ['./card-details.page.scss'],
})
export class CardDetailsPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  back() {
    this.modalCtrl.dismiss();
  }
}
