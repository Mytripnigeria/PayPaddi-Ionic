import { TransactionsService } from './../../../../services/transactions/transactions.service';
import { DepositAmountPage } from './../../deposit-amount/deposit-amount.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SwiperOptions } from 'swiper';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { environment } from 'src/environments/environment';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { DataService } from 'src/app/services/data/data.service';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  publicKey;
  customerDetails;
  customizations;
  meta;
  amount = null;
  paymentData: InlinePaymentOptions;

  accounts;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true, type: 'bullets' },
    allowTouchMove: true,
  };
  constructor(
    private clipBsc: ClipboardService,
    private modalCtrl: ModalController,
    private dataService: DataService,
    private util: UtilityService,
    private flutterwave: Flutterwave,
    private alertController: AlertController,
    private toastService: ToastService,
    private transferService: TransferService,
    private modalController: ModalController,
    private transactionService: TransactionsService
  ) {
    this.init();
  }

  ngOnInit() {}

  init() {
    const user = this.dataService.getUserProfile();
    this.publicKey = environment.FlutterPublicKey;

    this.customerDetails = {
      name: user.firstname,
      email: user.email,
      phone_number: user.phone,
    };

    this.customizations = {
      title: 'Paypaddi',
      description: 'Fintech',
      logo: 'https://cdn.filestackcontent.com/jOv1Bin3QHyNhh4VrK1t',
    };

    this.meta = {
      user_id: user.id,
      consumer_mac: this.generateReference(),
    };

    this.paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: 500,
      currency: 'NGN',
      redirect_url: '',
      meta: this.meta,
      customer: this.customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this,
    };
  }

  back() {
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {
    this.getBankAccounts();
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Coming Soon!!!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  payWithCard(amount) {
    this.paymentData.payment_options = 'card';
    this.paymentData.amount = Number(amount);
    console.log(this.paymentData);
    this.flutterwave.inlinePay(this.paymentData);
  }

  payWithBank() {
    this.paymentData.payment_options = 'account';
    console.log(this.paymentData);
    this.flutterwave.inlinePay(this.paymentData);
  }

  payWithUSSD(amount) {
    this.paymentData.payment_options = 'ussd';
    this.paymentData.amount = Number(amount);
    console.log(this.paymentData);
    this.flutterwave.inlinePay(this.paymentData);
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    this.flutterwave.closePaymentModal();
    this.verifyPayment(response.transaction_id);

    console.log(response);

    // this.completeRegistration(response.transaction_id);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
    this.flutterwave.closePaymentModal();
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  async collectAmount(type) {
    if (type) return this.alert();
    const modal = await this.modalController.create({
      component: DepositAmountPage,
      swipeToClose: true,
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.amount = data.amount;
      if (type == 'ussd') this.payWithUSSD(data.amount);
      if (type == 'card') this.payWithCard(data.amount);
    }
  }

  async verifyPayment(transaction_id) {
    const loader = await this.util.loader('Verifying Topup');
    loader.present();
    const response = await this.transactionService.verifyPayment(
      transaction_id,
      this.amount
    );
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.modalController.dismiss();
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );
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
        'Unable to verify transaction',
        2000
      );
    }
  }

  async getBankAccounts() {
    const user = this.dataService.getUserProfile();
    const loader = await this.util.loader('Fetching Accounts');
    loader.present();
    const response = await this.transferService.getbankAccounts({
      account_name: user.firstname + ' ' + user.lastname,
      bvn: '',
      name: user.firstname + ' ' + user.lastname,
      email: user.email,
    });
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.accounts = response.result.data.data;
      } else {
        this.accounts = response.result.data.data;
        // this.toastService.presentToast(
        //   'Error',
        //   'top',
        //   'danger',
        //   response.result.data.message,
        //   2000
        // );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Please retry submission',
        2000
      );
    }
  }

  copyNumber(account_number) {
    this.clipBsc.copy(account_number);
    this.toastService.presentToast(
      'Copied!',
      'top',
      'success',
      'Account number copied.',
      2000
    );
  }
}
