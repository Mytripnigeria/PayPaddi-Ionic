import { BankListPage } from './../bank-list/bank-list.page';
import { PinVerifyPage } from './../pin-verify/pin-verify.page';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { DataService } from './../../../services/data/data.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TransferService } from './../../../services/transfer/transfer.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.page.html',
  styleUrls: ['./bank-transfer.page.scss'],
})
export class BankTransferPage implements OnInit {
  transfer_card_form: FormGroup;
  verified = false;
  verifying = false;
  bankCode = '';
  accountName = null;
  bankName = '';
  beneficiary = false;
  addBeneficiary = false;
  numberIsComplete = false;
  banks;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastService: ToastService,
    private navCtrl: NavController,
    private util: UtilityService,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    this.transfer_card_form = this.formBuilder.group({
      amount: [0, Validators.required],
      bank_code: [''],
      account_number: ['', Validators.required],
      account_name: [''],
      narration: [''],
    });

    this.banks = this.dataService.getBanksData();
  }
  cancel() {
    this.modalController.dismiss();
  }

  async verify() {
    if (this.beneficiary) return;
    this.verifying = true;
    const response = await this.transferService.verifyBank({
      bank_code: this.bankCode,
      account_number: this.transfer_card_form.value.account_number,
    });
    this.verifying = false;
    if (response.result) {
      if (!response.result.data.error) {
        const userData = response.result.data.data;
        console.log(userData);
        this.transfer_card_form.value.account_name = userData.account_name;
        this.accountName = userData.account_name;
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

  async chooseBank() {
    const modal = await this.modalController.create({
      component: BankListPage,
      swipeToClose: true,
      componentProps: {
        type: 'Bank',
      },
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data && data.bank_code) {
      this.beneficiary = false;
      this.bankCode = data.bank_code;
      this.bankName = data.bank_name;
      this.transfer_card_form.patchValue({ account_number: '' });
    }
  }

  bankChange(ev) {
    console.log(ev.detail.value);
    this.bankCode = ev.detail.value;
    this.transfer_card_form.patchValue({ account_number: '' });
  }

  async selectBeneficiary() {
    const modal = await this.modalController.create({
      component: BankListPage,
      swipeToClose: true,
      componentProps: {
        type: 'Beneficiary',
      },
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data && data.payload) {
      this.beneficiary = true;
      this.bankCode = data.payload.service_code;
      this.bankName = data.payload.service_name;
      this.transfer_card_form.patchValue({
        account_number: data.payload.service_number,
      });
      this.accountName = data.payload.name;
      this.verified = true;
      this.numberIsComplete = true;
    }
  }

  async confirmTransaction() {
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

  switchBeneficiary(ev) {
    this.addBeneficiary = ev.detail.checked;
  }

  async transfer() {
    const loader = await this.util.loader('Sending');
    loader.present();
    this.transfer_card_form.value.account_name = this.accountName;
    this.transfer_card_form.value.bank_code = this.bankCode;
    console.log(this.transfer_card_form.value);

    const response = await this.transferService.sendToBank(
      this.transfer_card_form.value
    );

    if (response.result) {
      if (!response.result.data.error) {
        if (this.addBeneficiary) {
          await this.transferService.addToBeneficiaries({
            account_id: '',
            type: 'bank',
            name: response.result.data.data.account_name,
            service: 'bank',
            service_code: response.result.data.data.bank_code,
            service_name: response.result.data.data.bank_name,
            service_number: response.result.data.data.account_number,
            logo: '',
          });
          this.dataService.commitBeneficiaries();
          loader.dismiss();
        } else {
          loader.dismiss();
        }

        //add_to_beneficiary
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );

        this.modalController.dismiss({ reload: true });
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.message,
          2000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Transfer not completed',
        2000
      );
    }
  }

  acctNumChange(ev) {
    console.log(ev);

    if (ev.length > 9) {
      this.numberIsComplete = true;
      this.verify();
    } else {
      this.error();
      console.log('less');
    }
  }

  error() {
    this.numberIsComplete = false;
    this.verified = false;
    this.verifying = false;
    this.accountName = null;
  }
}
