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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  content_loaded: boolean = false;
  userData: IUser;
  userBalance: null;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true, type: 'bullets' },
    allowTouchMove: true,
  };
  constructor(
    private routerOutlet: IonRouterOutlet,
    private tabs: TabsPage,
    private modalController: ModalController,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  ionViewWillEnter() {
    console.log('came here oo');
    this.getUserWallet();
    this.userData = this.dataService.getUserProfile();
    console.log(this.userData);
  }

  async getUserWallet() {
    const response = await this.userService.getUserWallet();
    console.log('wallet==>', response);
    if (response.result) {
      this.userBalance = response.result.data.current_balance;
    }
  }

  async buyAirtime() {
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
  }

  async buyData() {
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
  }

  async buyElectricity() {
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
  }

  async buyBetting() {
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
  }

  async buyEducation() {
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
  }

  async buyCable() {
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
  }

  async viewTransaction() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: PaymentDetailPage,
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
    const modal = await this.modalController.create({
      component: DepositPage,
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
