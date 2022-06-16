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
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private transferService: TransferService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.transfer_card_form = this.formBuilder.group({
      amount: [0, Validators.required],
      username: ['', Validators.required],
    });
  }
  cancel() {
    this.modalController.dismiss();
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

    const response = await this.transferService.verifyUser(
      this.transfer_card_form.value.username
    );
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

  async transfer() {
    const loader = await this.util.loader('Sending');
    loader.present();
    console.log(this.transfer_card_form.value);
    const payload = {
      amount: this.transfer_card_form.value.amount,
      balance: 'current_balance',
      username: this.transfer_card_form.value.username,
    };
    const response = await this.transferService.sendToWallet(payload);
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
