import { DataService } from './../../../services/data/data.service';
import { InsightsPage } from './../insights/insights.page';
import { PaymentDetailPage } from './payment-detail/payment-detail.page';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';
import * as moment from 'moment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  content_loaded: boolean = false;
  transactions = [];
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Fake timeout
    this.transactions = this.rearrangeTransactions();
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  formatTime(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  rearrangeTransactions() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const transactionsHolder = this.dataService.getTransactions();

    this.transactions = transactionsHolder.reduce((groups, transaction) => {
      const date = new Date(transaction.created_at);
      const segment = `${months[date.getMonth()]}, ${date.getFullYear()}`;
      if (!groups[segment]) {
        groups[segment] = [];
      }

      //form sub group array
      groups[segment].push(transaction);
      return groups;
    }, {});
    const groupArrays = Object.keys(this.transactions).map((segment) => {
      return {
        segment,
        transactions: this.transactions[segment],
      };
    });
    console.log(groupArrays);
    return groupArrays;
  }

  // Filter
  async filter() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: FilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {
      // Reload
      this.content_loaded = false;

      // Fake timeout
      setTimeout(() => {
        this.content_loaded = true;
      }, 2000);
    }
  }

  async viewDetail(transaction) {
    const modal = await this.modalController.create({
      component: PaymentDetailPage,
      componentProps: { transaction },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  async insight() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: InsightsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }
}
