import { ToastService } from 'src/app/services/toast/toast.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { DataService } from './../../../../services/data/data.service';
import { ICardCreate } from './../../../../models/cardCreate';
import { CardsService } from 'src/app/services/cards/cards.service';
import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFees } from 'src/app/models/fees';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  add_card_form: FormGroup;
  submit_attempt: boolean = false;
  cardType: null;
  currentAmount = null;
  currentRate = null;
  fees: IFees;
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private toastService: ToastService,
    private cardService: CardsService,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Setup form
    // this.getTransferRate();
    this.add_card_form = this.formBuilder.group({
      card_number: ['', Validators.required],
      expiry_date: ['', Validators.required],
      amount: [0, Validators.required],
      card_type: ['', Validators.required],
      cvv: [
        '',
        Validators.compose([
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
    });
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

  getAmount(rate) {
    console.log(parseFloat(rate));
    console.log(parseFloat(this.add_card_form.value.amount));
    if (
      this.add_card_form.value.amount &&
      this.add_card_form.value.amount !== ''
    )
      return parseFloat(this.add_card_form.value.amount) * parseFloat(rate);
  }

  changeCard(ev) {
    this.cardType = ev.detail.value;
    if (this.cardType == 'naira') {
      this.currentAmount = this.add_card_form.value.amount;
    }
    this.getFees();
  }

  async getTransferRate() {
    const payload = {
      amount: Number(this.add_card_form.value.amount),
      source: 'NGN',
      destination: 'USD',
    };
    if (
      this.cardType == 'dollar' &&
      Number(this.add_card_form.value.amount) !== 0
    ) {
      const response = await this.userService.getTransferRate(payload);
      console.log('rate', response);
      if (response.result) {
        this.currentRate = response.result.data.rate;
        return response.result.data.source.amount;
      }
    } else {
      return Number(this.add_card_form.value.amount);
    }
  }

  async amountChange() {
    this.currentAmount = await this.getTransferRate();
  }
  // Format credit
  formatCreditCardNumber(event: any) {
    // Input val
    let value = event.detail.value;

    // Format: 0000 0000 0000 0000
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    // Set formatted value
    if (parts.length > 0) {
      this.add_card_form.get('card_number').setValue(parts.join(' '));
    } else {
      this.add_card_form.get('card_number').setValue(value);
    }
  }

  // Format expiry date
  formatExpiryDate(event: any) {
    // Input val
    let value = event.detail.value;

    // Format: 01/23
    if (value.length == 3) {
      if (!value.includes('/')) {
        const month = value.slice(0, 2);
        const year = value.slice(2, 4);
        this.add_card_form.get('expiry_date').setValue(month + '/' + year);
      }
    } else if (value.length > 5) {
      value = value.substring(0, value.length - 1);
      this.add_card_form.get('expiry_date').setValue(value);
    }
  }

  // Cancel
  cancel() {
    // Dismiss modal
    this.modalController.dismiss();
  }

  // Save card
  async save() {
    this.submit_attempt = true;

    const payload: ICardCreate = {
      debit_currency: 'NGN',
      amount: this.add_card_form.value.amount,
      currency: this.cardType == 'dollar' ? 'USD' : 'NGN',
      name:
        this.dataService.userProfile.firstname +
        ' ' +
        this.dataService.userProfile.lastname,
      address:
        this.cardType == 'dollar'
          ? '333 Fremont Street'
          : '19, Olubunmi Rotimi',
      city: this.cardType == 'dollar' ? 'San Francisco, CA' : 'Lekki',
      state: this.cardType == 'dollar' ? 'Califonia' : 'Lagos',
      postal_code: this.cardType == 'dollar' ? '94105' : '23401',
      country: this.cardType == 'dollar' ? 'US' : 'NG',
    };
    console.log('payload to send==>', payload);
    const loader = await this.util.loader('creating');
    loader.present();
    const response = await this.cardService.createCard(payload);
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Card successfully created',
          2000
        );
        this.modalController.dismiss({ reload: true });
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to create card',
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to create card',
        2000
      );
    }
  }
}
