import { DataService } from './../../../services/data/data.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { ICard } from './../../../models/cards';
import { CardTransactionsPage } from './card-transactions/card-transactions.page';
import { PaymentsPage } from './../payments/payments.page';
import { FundCardPage } from './fund-card/fund-card.page';
import { CardDetailsPage } from './card-details/card-details.page';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  NgZone,
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
import { CardsService } from 'src/app/services/cards/cards.service';
import { VerificationsPage } from '../settings/verifications/verifications.page';
import { VerificationNoticePage } from '../verification-notice/verification-notice.page';
import { IUser } from 'src/app/models/user';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  userData: IUser;
  // Swiper config
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: false },
    allowTouchMove: true,
  };
  cardsCopy: ICard[];
  cards: ICard[];
  card_details_visible: boolean = false;
  card_active: boolean = false;
  constructor(
    private util: UtilityService,
    private alertController: AlertController,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private cardsService: CardsService,
    private routerOutlet: IonRouterOutlet,
    private ngZone: NgZone,
    private dataService: DataService
  ) {
    this.getAllCards();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  ngOnInit() {
    this.userData = this.dataService.getUserProfile();
  }

  refreshCards() {}

  async getAllCards() {
    this.cards = this.dataService.getCardsData();

    if (this.cards.length > 0) {
      this.cards.forEach((element, index) => {
        this.cards[index].syncing = false;
      });

      this.card_active = this.cards[0].is_active;
    }
  }

  slideChanged() {
    const index = this.swiper.swiperRef.activeIndex;
    this.ngZone.run(() => {
      this.card_active = this.cards[index].is_active;
    });

    console.log(this.card_active);
  }

  getStatus() {
    return this.card_active;
  }

  // Sync
  async sync(load?) {
    this.cardsCopy = this.cards;
    this.cards = null;
    const loader = await this.util.loader('syncing');
    if (load) loader.present();

    const response = await this.cardsService.getCards();
    console.log(response);
    if (load) loader.dismiss();

    if (response.result && !response.result.data.error) {
      this.cards = response.result.data.data;
      this.toastService.presentToast(
        'Success',
        'top',
        'success',
        'Cards updated',
        2000
      );
    } else {
      this.cards = this.cardsCopy;
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Syncing failed',
        2000
      );
    }
  }

  // Add card
  async addCard() {
    // Open filter modal
    if (this.userData.is_email_verify) {
      const modal = await this.modalController.create({
        component: AddPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
      });
      await modal.present();
      const data = await modal.onDidDismiss();
      if (data.data) {
        if (data.data.reload) {
          this.sync(true);
        }
      }
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
  }

  async cardDetail() {
    // Open filter modal
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const modal = await this.modalController.create({
      component: CardDetailsPage,
      componentProps: { payload: currentCard },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  refereshCard() {
    const index = this.swiper.swiperRef.activeIndex;
    this.cards[index].syncing = true;
    this.getSingleCard(this.cards[index].id);
  }

  async getSingleCard(id) {
    // const loader = await this.util.loader('syncing');
    // loader.present();
    const index = this.swiper.swiperRef.activeIndex;
    this.cards[index].syncing = true;
    const response = await this.cardsService.getSingleCard(id);
    console.log(response);
    // loader.dismiss();
    if (response.result && !response.result.data.error) {
      this.cards[index] = response.result.data.data;
      this.cards[index].syncing = false;
    } else {
    }
  }

  async fundCard() {
    // Open filter modal
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const modal = await this.modalController.create({
      component: FundCardPage,
      componentProps: {
        payload: {
          type: 'fund',
          amount: currentCard.amount,
          currency: currentCard.currency,
          virtual_card_id: currentCard.id,
        },
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data) {
      if (data.data.reload) {
        this.getSingleCard(data.data.card_id);
      }
    }
  }

  async viewTransactions() {
    // Open filter modal
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const modal = await this.modalController.create({
      component: CardTransactionsPage,
      componentProps: {
        payload: {
          type: 'fund',
          amount: currentCard.amount,
          currency: currentCard.currency,
          virtual_card_id: currentCard.id,
        },
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async withdrawCard() {
    // Open filter modal
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const modal = await this.modalController.create({
      component: FundCardPage,
      componentProps: {
        payload: {
          type: 'withdraw',
          amount: currentCard.amount,
          currency: currentCard.currency,
          virtual_card_id: currentCard.id,
        },
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async freezeCard(ev) {
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const action = currentCard.is_active == false ? 'unblock' : 'block';
    const data = {
      status_action: action,
      virtual_card_id: currentCard.id,
    };
    const loader = await this.util.loader('Working...');
    loader.present();

    const response = await this.cardsService.freezeCard(data);
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        // this.card_freeze = !this.card_freeze;
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );
      }
    }
  }

  // Delete card
  async confirmDeleteCard() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Delete this card permanently?',
      message: 'This action cannot be undone.',
      buttons: [
        {
          text: 'Delete card',
          cssClass: 'danger',
          handler: async () => {
            this.deleteCard();
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

  async deleteCard() {
    const index = this.swiper.swiperRef.activeIndex;
    const currentCard: ICard = this.cards[index];
    const response = await this.cardsService.deleteCard({
      virtual_card_id: currentCard.id,
    });
    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Card has been deleted',
          2000
        );
        this.sync(true);
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.message,
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to delete card',
        2000
      );
    }
  }
}
