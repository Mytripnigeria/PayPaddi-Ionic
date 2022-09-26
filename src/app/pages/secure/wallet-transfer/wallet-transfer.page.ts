import { UserService } from './../../../services/user/user.service';
import { CurrencyPipe } from '@angular/common';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TransferService } from './../../../services/transfer/transfer.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PinVerifyPage } from '../pin-verify/pin-verify.page';

@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.page.html',
  styleUrls: ['./wallet-transfer.page.scss'],
})
export class WalletTransferPage implements OnInit {
  transfer_card_form: FormGroup;
  verified = false;
  verifying = false;
  accountName = null;
  amountHolder = null;
  totalAmount = null;
  currentFee = null;
  fees = null;
  amount = null;
  username = null;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private transferService: TransferService,
    private util: UtilityService,
    private currencyPipe: CurrencyPipe,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getFees();
  }
  cancel() {
    this.modalController.dismiss();
  }
  async getFees() {
    const response = await this.userService.getUserFees();
    console.log(response);
    if (response.result) {
      this.fees = response.result.data;
    } else {
      // fees not fetch
    }
  }

  async confirmTransfer() {
    const modal = await this.modalController.create({
      component: PinVerifyPage,
      swipeToClose: false,
      cssClass: 'transfer-modal',
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();
    if (data.success) {
      console.log(data);
      this.transfer();
    } else {
      console.log('wrong');
    }
  }
  async verify() {
    this.verifying = true;

    const response = await this.transferService.verifyUser(this.username);
    this.verifying = false;
    if (response.result) {
      if (!response.result.data.error) {
        const userData = response.result.data.data;
        console.log(userData);
        this.accountName = userData.firstname + ' ' + userData.lastname;
        this.verified = true;
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
        'Unable to verify user',
        2000
      );
    }
  }

  amountChange(ev) {
    if (ev == '') return (this.amountHolder = null);
    ev = ev.replace(/,/g, '');
    this.amount = this.currencyPipe.transform(ev, '', '', '0.0-0');
    this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));

    // this.totalAmount = this.amountHolder +
  }

  keyPressNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  async transfer() {
    const loader = await this.util.loader('Sending');
    loader.present();
    const payload = {
      amount: parseFloat(this.amount.replace(/,/g, '')),
      balance: 'current_balance',
      username: this.username,
    };
    const response: any = await this.transferService.sendToWallet(payload);
    loader.dismiss();

    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );
        this.modalController.dismiss({ reload: true });
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
        'Transfer not completed',
        2000
      );
    }
  }
}
