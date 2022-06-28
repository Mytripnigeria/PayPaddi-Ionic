import { INOK } from './../../../models/nextOfKin';
import { Router } from '@angular/router';
import { ToastService } from './../../../services/toast/toast.service';
import { TransactionsService } from './../../../services/transactions/transactions.service';
import { BuyAirtimePage } from './../buy-airtime/buy-airtime.page';
import { TabsPage } from './../../../tabs/tabs.page';
import { UserService } from './../../../services/user/user.service';
import { IUser } from './../../../models/user';
import { DataService } from './../../../services/data/data.service';
import { VerificationsPage } from './../settings/verifications/verifications.page';
import { VerificationPage } from './verification/verification.page';
import { DepositPage } from './deposit/deposit.page';
import { PaymentDetailPage } from './../payments/payment-detail/payment-detail.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import * as moment from 'moment';
import { VerificationNoticePage } from '../verification-notice/verification-notice.page';
import { UpdatePinPage } from '../settings/update-pin/update-pin.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  content_loaded: boolean = false;
  userData: IUser;
  nextOfKin: INOK = null;
  userBalance: null;
  transactions = [];
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true, type: 'bullets' },
    allowTouchMove: true,
  };
  constructor(
    private routerOutlet: IonRouterOutlet,
    private tabs: TabsPage,
    private router: Router,
    private modalController: ModalController,
    private dataService: DataService,
    private userService: UserService,
    private transactionService: TransactionsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Fake timeout
  }

  ionViewWillEnter() {
    console.log('came here oo');
    this.getUserWallet();
    this.getAllTransactions();
    this.userData = this.dataService.getUserProfile();
    this.nextOfKin = this.dataService.getUserNextofKin();
    console.log(this.userData);
  }

  formatTime(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  async updatePin() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: UpdatePinPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  goToCards() {
    this.router.navigate(['/cards']);
  }

  async getAllTransactions() {
    this.content_loaded = false;
    const response = await this.transactionService.getAllTransactions();

    if (response.result) {
      if (!response.result.data.error) {
        const transactionHolder: [] = response.result.data.data;
        this.dataService.setTransactions(transactionHolder);
        this.transactions = transactionHolder.reverse().slice(0, 20);
        console.log(this.transactions);
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Couln not retrieve transactions',
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Couln not retrieve transactions',
        2000
      );
    }

    this.content_loaded = true;
    console.log('transactions===>', response);
  }

  async getUserWallet() {
    this.userBalance = null;
    const response = await this.userService.getUserWallet();
    console.log('wallet==>', response);
    if (response.result) {
      this.userBalance = response.result.data.current_balance;
    }
  }

  async buyAirtime() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'airtime',
          identifier: 'airtime',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async buyData() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'data',
          identifier: 'data',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async buyElectricity() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'power',
          identifier: 'electricity-bill',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async buyBetting() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'betting',
          identifier: 'betting',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async buyEducation() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'education',
          identifier: 'education',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async buyCable() {
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: BuyAirtimePage,
        componentProps: {
          type: 'cable',
          identifier: 'tv-subscription',
        },
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.reload) {
        this.getAllTransactions();
        this.getUserWallet();
      } else {
        //nothing
      }
    } else {
      this.verifyNotice('email');
    }
  }

  async viewTransaction(transaction) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: PaymentDetailPage,
      componentProps: { transaction },
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

  async deposit() {
    // Open filter modal
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: DepositPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });

      await modal.present();
    } else {
      this.verifyNotice('email');
    }
  }

  async verifyNotice(type) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationNoticePage,
      swipeToClose: true,
      componentProps: { type },
      cssClass: 'transfer-modal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.verify) {
      this.verify();
    }
  }

  async verify() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: VerificationsPage,
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

  async send() {
    await this.tabs.selectAction();
  }
}
