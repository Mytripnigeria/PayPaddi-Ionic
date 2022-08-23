import { UserService } from './../../../services/user/user.service';
import { CurrencyPipe } from '@angular/common';
import { DataService } from './../../../services/data/data.service';
import {
  IBuyData,
  IBuyAirtime,
  IVerifyEducation,
  IBuyEducation,
  IBuyElectricity,
  IVerifyElectricity,
  IVerifyTV,
  IBuyTV,
  IVerifyBetting,
  IBuyBetting,
} from './../../../models/bills';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BankListPage } from './../bank-list/bank-list.page';
import { BillpaymentService } from './../../../services/billpayment/billpayment.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PinVerifyPage } from '../pin-verify/pin-verify.page';

@Component({
  selector: 'app-buy-airtime',
  templateUrl: './buy-airtime.page.html',
  styleUrls: ['./buy-airtime.page.scss'],
})
export class BuyAirtimePage implements OnInit {
  type = null;
  verifying = false;
  variation = null;
  identifier = null;
  fees = null;
  service = null;
  amount = null;
  amountHolder = null;
  billersCode = null;
  verificationData = null;
  variations = [];
  services = [];
  constructor(
    private navParam: NavParams,
    private bill: BillpaymentService,
    private modalController: ModalController,
    private toastService: ToastService,
    private util: UtilityService,
    private dataService: DataService,
    private currencyPipe: CurrencyPipe,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.type = this.navParam.data.type;
    this.identifier = this.navParam.data.identifier;
    this.getServices();
    this.getFees();
  }

  getTotalAmount() {
    if (this.type == 'power') {
      return (
        parseFloat(this.amountHolder) + parseFloat(this.fees['electricity'])
      );
    } else {
      return parseFloat(this.amountHolder) + parseFloat(this.fees[this.type]);
    }
  }

  getCurrentFee() {
    if (this.type == 'power') {
      return this.fees['electricity'];
    } else {
      return this.fees[this.type];
    }
  }

  async getServices() {
    const loader = await this.util.loader('Getting Services');
    loader.present();
    let response = null;
    if (this.type !== 'betting') {
      response = await this.bill.getServicesByIdentifier(this.identifier);
    } else {
      response = await this.bill.getBetting();
      console.log(response);
    }

    if (response.result) {
      if (!response.result.data.error) {
        console.log(response);
        this.services = response.result.data.data;
        if (this.services && !response.result.data.data.errors) {
          // this.service = this.services[0];
          //   if (this.type !== 'airtime')
          //     await this.getVariations(this.services[0].serviceID, false);
        }

        loader.dismiss();
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
        'Unable to complete transaction',
        4000
      );
    }
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

  async getVariations(serviceID, loading = true) {
    const loader = await this.util.loader('Getting Packages');
    if (loading) loader.present();

    const response = await this.bill.getServicesByServiceID(serviceID);
    if (loading) loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        console.log(response);
        this.variations = response.result.data.data.varations;
        console.log('variationss', this.variations);
        if (this.variations) {
          console.log('variationss', this.variations, this.type);
          this.variation = this.variations[0];
          this.amount = this.variations[0].variation_amount;
          this.amount = this.currencyPipe.transform(
            this.amount,
            '',
            '',
            '0.0-0'
          );
          // this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));
          this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));
          // if (this.type == 'power') {
          //   this.verifyElectricity();
          // }
        }
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
        'Unable to complete transaction',
        4000
      );
    }
  }
  cancel() {
    this.modalController.dismiss();
  }

  async chooseService() {
    const modal = await this.modalController.create({
      component: BankListPage,
      swipeToClose: true,
      componentProps: {
        services: this.services,
        type: 'services',
        exception: this.type == 'betting' ? 'betting' : null,
      },
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data && data.service) {
      this.verificationData = null;
      this.billersCode = null;
      this.service = data.service;
      if (this.type !== 'airtime' && this.type !== 'betting')
        this.getVariations(data.service.serviceID);
    }
  }

  async chooseVariation() {
    const modal = await this.modalController.create({
      component: BankListPage,
      swipeToClose: true,
      componentProps: {
        variations: this.variations,
        type: 'variations',
      },
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    // console.log(data);
    if (data && data.variation) {
      this.variation = data.variation;
      this.amount = data.variation.variation_amount;
      this.amount = this.currencyPipe.transform(this.amount, '', '', '0.0-0');
      // this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));
      this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));

      console.log('deb==>', this.amount);
      // this.verifyElectricity();
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
      this.buyBill();
    } else {
      console.log('wrong');
    }
  }

  amountChange(ev) {
    console.log('the ev===>', ev);
    if (ev == '') return (this.amountHolder = null);
    ev = ev.replace(/,/g, '');
    this.amount = this.currencyPipe.transform(ev, '', '', '0.0-0');
    this.amountHolder = parseFloat(this.amount.replace(/,/g, ''));
    console.log(parseFloat(this.amountHolder));
    // this.totalAmount = this.amountHolder +
  }

  async buyAirtime() {
    const loader = await this.util.loader('purchasing');
    loader.present();
    console.log(this.service);
    console.log(this.variation);
    const payload: IBuyAirtime = {
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.billersCode,
      service_id: this.service.serviceID,
    };
    const response = await this.bill.buyAirtime(payload);
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
        'Unable to complete transaction',
        4000
      );
    }
  }
  async buyData() {
    const loader = await this.util.loader('Purchasing');
    loader.present();
    console.log(this.service);
    console.log(this.variation);
    const payload: IBuyData = {
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.billersCode,
      service_id: this.service.serviceID,
      variation_code: this.variation.variation_code,
    };
    const response = await this.bill.buyData(payload);
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
        'Unable to complete transaction',
        4000
      );
    }
  }
  async verifyEducation() {
    const loader = await this.util.loader('Verifying');
    loader.present();
    // if (this.service.serviceID == 'jamb') {
    const payload: IVerifyEducation = {
      billers_code: this.billersCode,
      service_id: this.service.serviceID,
    };

    const response = await this.bill.verifyEducation(payload);
    if (response.result) {
      loader.dismiss();
      if (!response.result.data.error) {
        this.verificationData = response.result.data.data;
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to complete transaction',
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
    // } else {
    //   this.buyEducation(loader);
    // }
  }

  async verifyElectricity() {
    const loader = await this.util.loader('Verifying');
    loader.present();

    const payload: IVerifyElectricity = {
      billers_code: this.billersCode,
      service_id: this.service.serviceID,
      type: this.variation.variation_code,
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.dataService.userProfile.phone,
    };

    const response = await this.bill.verifyElectricity(payload);
    if (response.result) {
      loader.dismiss();
      if (!response.result.data.error) {
        // this.buyElectricity(loader);
        console.log('from VErification', response);
        this.verificationData = response.result.data.data;
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.data,
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }

  async verifyCable() {
    const loader = await this.util.loader('Verifying');
    loader.present();

    const payload: IVerifyTV = {
      billers_code: this.billersCode,
      service_id: this.service.serviceID,
    };

    const response = await this.bill.verifyTV(payload);
    if (response.result) {
      loader.dismiss();
      if (!response.result.data.error) {
        // this.buyCable(loader);
        this.verificationData = response.result.data.data;
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.data,
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }

  async verifyBetting() {
    const loader = await this.util.loader('Verifying');
    loader.present();

    const payload: IVerifyBetting = {
      biller: this.service,
      better_id: this.billersCode,
    };

    const response = await this.bill.verifyBetting(payload);
    if (response.result) {
      loader.dismiss();
      if (!response.result.data.error) {
        // this.buyCable(loader);
        this.verificationData = response.result.data.data;
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.data,
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }

  async buyEducation() {
    const loader = await this.util.loader('Purchasing');
    loader.present();
    const payload: IBuyEducation = {
      service_id: this.service.serviceID,
      variation_code: this.variation.variation_code,
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.dataService.userProfile.phone,
      billers_code: this.billersCode,
    };
    const response = await this.bill.buyEducation(payload);
    if (response.result) {
      loader.dismiss();
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
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to complete transaction',
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }
  async buyElectricity() {
    const loader = await this.util.loader('Purchasing');
    loader.present();
    const payload: IBuyElectricity = {
      billers_code: this.billersCode,
      service_id: this.service.serviceID,
      type: this.variation.variation_code,
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.dataService.userProfile.phone,
    };
    const response = await this.bill.buyElectricity(payload);
    if (response.result) {
      loader.dismiss();
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
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to complete transaction',
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }

  async buyCable() {
    const loader = await this.util.loader('Purchasing');
    loader.present();
    const payload: IBuyTV = {
      billers_code: this.billersCode,
      service_id: this.service.serviceID,
      variation_code: this.variation.variation_code,
      amount: `${parseFloat(this.amount.replace(/,/g, ''))}`,
      phone: this.dataService.userProfile.phone,
    };

    const response = await this.bill.buyTV(payload);
    if (response.result) {
      loader.dismiss();
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
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to complete transaction',
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }
  async buyBetting() {
    const loader = await this.util.loader('Purchasing');
    loader.present();
    const payload: IBuyBetting = {
      biller: this.service,
      better_id: this.billersCode,
      amount: parseFloat(this.amount.replace(/,/g, '')),
    };

    const response = await this.bill.buyBetting(payload);
    if (response.result) {
      loader.dismiss();
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
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to complete transaction',
          4000
        );
      }
    } else {
      loader.dismiss();
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to complete transaction',
        4000
      );
    }
  }

  buyBill() {
    if (this.type == 'airtime') this.buyAirtime();
    if (this.type == 'data') this.buyData();
    if (this.type == 'education') this.buyEducation();
    if (this.type == 'power') this.buyElectricity();
    // if (this.type == 'power') this.buyPower();
    if (this.type == 'cable') this.buyCable();
    if (this.type == 'betting') this.buyBetting();
  }

  veriyBill() {
    if (this.type == 'power') this.verifyElectricity();
    if (this.type == 'education') this.verifyEducation();
    if (this.type == 'cable') this.verifyCable();
    if (this.type == 'betting') this.verifyBetting();
  }

  verifiable() {
    if (
      this.type == 'cable' ||
      this.type == 'power' ||
      this.type == 'betting' ||
      (this.type == 'education' && this.service.serviceID == 'jamb')
    ) {
      if (!this.verificationData) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  phoneNumChange(ev) {
    this.verificationData = null;
  }
}
