import { EditPage } from './../profile/edit/edit.page';
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
import { NotificationsPage } from '../notifications/notifications.page';

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
  isProfileComplete = false;
  transactions = [];
  notifications;
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

  ionViewWillEnter(ev?) {
    console.log('came here oo');
    this.getUserWallet();
    this.getAllTransactions(ev);
    this.profileComplete();
    this.getAllNotifications();
    this.userData = this.dataService.getUserProfile();
    this.nextOfKin = this.dataService.getUserNextofKin();
    console.log('Next of KIN', this.nextOfKin);
  }

  doRefresh(ev) {
    this.ionViewWillEnter(ev);
  }

  noVerification() {
    if (
      this.userData.is_email_verify &&
      this.userData.pin &&
      this.userData.is_kyc1_verify &&
      this.userData.is_kyc2_verify &&
      this.isProfileComplete &&
      this.nextOfKin
    ) {
      return true;
    } else {
      return false;
    }
  }

  formatTime(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  profileComplete() {
    const profile = this.dataService.getUserProfile();

    const { firstname, lastname, middlename, address, gender, picture } =
      profile;

    if (
      !firstname ||
      !lastname ||
      !middlename ||
      !address ||
      !gender ||
      !picture
    ) {
      this.isProfileComplete = false;
    } else {
      this.isProfileComplete = true;
    }
  }

  async gotoProfile() {
    this.dataService.setParams(true);
    const modal = await this.modalController.create({
      component: EditPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.dataService.setParams(false);
    if (data && data.updated) {
      this.profileComplete();
    }
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

  async gotoNotifications() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: NotificationsPage,
      swipeToClose: true,
      componentProps: { notifications: this.notifications },
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  goToCards() {
    this.router.navigate(['/cards']);
  }

  async getAllNotifications() {
    const response = await this.userService.getNotifications();
    if (response.result) {
      if (!response.result.data.error) {
        this.notifications = response.result.data.data;
      }
    }
  }

  async getAllTransactions(ev?) {
    this.content_loaded = false;

    const response = await this.transactionService.getAllTransactions();
    if (ev) ev.target.complete();
    if (response.result) {
      if (!response.result.data.error) {
        // console.log('from backend', response.result.data.data);
        const transactionHolder: [] = response.result.data.data;
        // console.log('holder===>', transactionHolder);
        this.dataService.setTransactions(transactionHolder);
        this.transactions = transactionHolder.slice(0, 20);
        this.transactions = this.transactions.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
        );
        // console.log('gotten', this.dataService.getTransactions());
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Could not retrieve transactions',
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Could not retrieve transactions',
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
        swipeToClose: false,
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
        swipeToClose: false,
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
        swipeToClose: false,
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
        swipeToClose: false,
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
        swipeToClose: false,
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
        swipeToClose: false,
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
