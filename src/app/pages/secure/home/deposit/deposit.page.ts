import { DataService } from './../../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  accounts;
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.accounts = this.dataService.getBankAccount();
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
