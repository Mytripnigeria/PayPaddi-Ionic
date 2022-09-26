import { ICard } from './../../../../models/cards';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CardsService } from 'src/app/services/cards/cards.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { IFees } from 'src/app/models/fees';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.page.html',
  styleUrls: ['./fund-card.page.scss'],
})
export class FundCardPage implements OnInit {
  fund_card_form: FormGroup;
  submit_attempt: boolean = false;
  payload;
  currentAmount = null;
  currentRate = null;
  fees: IFees;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navParam: NavParams,
    private cardsService: CardsService,
    private util: UtilityService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getFees();
    this.payload = this.navParam.data.payload;
    this.fund_card_form = this.formBuilder.group({
      amount: [0, Validators.required],
    });
    console.log(this.payload);
  }

  // Format credit

  // Cancel
  cancel() {
    // Dismiss modal
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

  keyPressNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  async getTransferRate() {
    const payload = {
      amount: Number(this.fund_card_form.value.amount),
      source: 'NGN',
      destination: 'USD',
    };
    console.log('==>1');
    console.log(this.payload.curency);
    if (
      this.payload.currency == 'USD' &&
      Number(this.fund_card_form.value.amount) !== 0
    ) {
      console.log('==>2');
      const response = await this.userService.getTransferRate(payload);
      console.log('rate', response);
      if (response.result) {
        this.currentRate = response.result.data.rate;
        return response.result.data.source.amount;
      }
    } else {
      return Number(this.fund_card_form.value.amount);
    }
  }

  async amountChange() {
    console.log('changing', Number(this.fund_card_form.value.amount));
    this.currentAmount = await this.getTransferRate();
  }

  getAmount(rate) {
    console.log(parseFloat(rate));
    console.log(parseFloat(this.fund_card_form.value.amount));
    if (
      this.fund_card_form.value.amount &&
      this.fund_card_form.value.amount !== ''
    )
      return parseFloat(this.fund_card_form.value.amount) * parseFloat(rate);
  }

  async withdraw() {
    this.submit_attempt = true;
    const loader = await this.util.loader('Funding...');
    loader.present();
    const fundData = {
      amount: this.fund_card_form.value.amount,
      currency: this.payload.currency,
      virtual_card_id: this.payload.virtual_card_id,
    };
    console.log(fundData);

    const response = await this.cardsService.withdrawFromCard(fundData);
    loader.dismiss();
    if (response.result) {
      if (response.result.data.error == false) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );
        this.modalController.dismiss({
          reload: true,
          card_id: this.payload.virtual_card_id,
        });
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
        'Failed to Withdraw',
        2000
      );
    }
  }

  // Save card
  async fundCard() {
    this.submit_attempt = true;
    const loader = await this.util.loader('Funding...');
    loader.present();
    const fundData = {
      amount: this.fund_card_form.value.amount,
      currency: this.payload.currency,
      virtual_card_id: this.payload.virtual_card_id,
    };
    console.log(fundData);

    const response = await this.cardsService.fundCard(fundData);
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
        this.modalController.dismiss({
          reload: true,
          card_id: this.payload.virtual_card_id,
        });
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
        'Failed to fund card',
        2000
      );
    }
  }
}
