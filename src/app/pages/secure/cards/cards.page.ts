import { CardTransactionsPage } from './card-transactions/card-transactions.page';
import { PaymentsPage } from './../payments/payments.page';
import { FundCardPage } from './fund-card/fund-card.page';
import { CardDetailsPage } from './card-details/card-details.page';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddPage } from './add/add.page';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  // Swiper config
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: false },
    allowTouchMove: true,
  };

  card_details_visible: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  // Sync
  async sync() {
    // Loading overlay
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: '<p>Syncing card...</p><span>Please be patient.</span>',
      spinner: 'crescent',
    });
    await loading.present();

    // Fake timeout
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  // Add card
  async addCard() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async cardDetail() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: CardDetailsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async fundCard() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: FundCardPage,
      componentProps: { type: 'fund' },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async viewTransactions() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: CardTransactionsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async withdrawCard() {
    // Open filter modal
    const modal = await this.modalController.create({
      component: FundCardPage,
      componentProps: { type: 'withdraw' },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  // Delete card
  async deleteCard() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Delete this card permanently?',
      message: 'This action cannot be undone.',
      buttons: [
        {
          text: 'Delete card',
          cssClass: 'danger',
          handler: async () => {
            this.toastService.presentToast(
              'Success',
              'Card successfully deleted',
              'top',
              'success',
              2000
            );
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
        },
      ],
    });

    await alert.present();
  }
}
