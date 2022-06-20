import {
  IBuyData,
  IBuyAirtime,
  IVerifyEducation,
  IBuyEducation,
  IBuyElectricity,
  IVerifyElectricity,
  IVerifyTV,
  IBuyTV,
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
  variation = null;
  identifier = null;
  service = null;
  amount = null;
  phoneNumber = null;
  verificationData = null;
  variations = [];
  services = [];
  constructor(
    private navParam: NavParams,
    private bill: BillpaymentService,
    private modalController: ModalController,
    private toastService: ToastService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.type = this.navParam.data.type;
    this.identifier = this.navParam.data.identifier;
    this.getServices();
  }

  async getServices() {
    const loader = await this.util.loader('getting services');
    loader.present();
    const response = await this.bill.getServicesByIdentifier(this.identifier);

    if (response.result) {
      if (!response.result.data.error) {
        console.log(response);
        this.services = response.result.data.data;
        if (this.services && !response.result.data.data.errors) {
          this.service = this.services[0];
          if (this.type !== 'airtime')
            await this.getVariations(this.services[0].serviceID, false);
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

  async getVariations(serviceID, loading = true) {
    const loader = await this.util.loader('getting variations');
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
      },
      cssClass: 'transfer-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data && data.service) {
      this.verificationData = null;
      this.phoneNumber = null;
      this.service = data.service;
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
    console.log(data);
    if (data && data.variation) {
      this.variation = data.variation;
      this.amount = data.variation.variation_amount;
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

  async buyAirtime() {
    const loader = await this.util.loader('purchasing');
    loader.present();
    console.log(this.service);
    console.log(this.variation);
    const payload: IBuyAirtime = {
      amount: this.amount,
      phone: this.phoneNumber,
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
    const loader = await this.util.loader('purchasing');
    loader.present();
    console.log(this.service);
    console.log(this.variation);
    const payload: IBuyData = {
      amount: '100',
      billers_code: '08102950347',
      phone: `0${this.phoneNumber}`,
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
    const loader = await this.util.loader('verifying');
    loader.present();
    // if (this.service.serviceID == 'jamb') {
    const payload: IVerifyEducation = {
      billers_code: '0123456789',
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
    const loader = await this.util.loader('verifying');
    loader.present();

    const payload: IVerifyElectricity = {
      billers_code: '1111111111111',
      service_id: this.service.serviceID,
      type: this.variation.variation_code,
      amount: this.amount,
      phone: this.phoneNumber,
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

  async verifyCable() {
    const loader = await this.util.loader('verifying');
    loader.present();

    const payload: IVerifyTV = {
      billers_code: 1212121212,
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

  async buyEducation() {
    const loader = await this.util.loader('purchasing');
    loader.present();
    const payload: IBuyEducation = {
      service_id: this.service.serviceID,
      variation_code: this.variation.variation_code,
      amount: this.amount,
      phone: this.phoneNumber,
      billers_code: '1111111111111',
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
    const loader = await this.util.loader('purchasing');
    loader.present();
    const payload: IBuyElectricity = {
      billers_code: '1111111111111',
      service_id: this.service.serviceID,
      type: this.variation.variation_code,
      amount: `${this.amount}`,
      phone: this.phoneNumber,
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
    const loader = await this.util.loader('purchasing');
    loader.present();
    const payload: IBuyTV = {
      billers_code: 1212121212,
      service_id: this.service.serviceID,
      variation_code: this.variation.variation_code,
      amount: this.amount,
      phone: this.phoneNumber,
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
  buyBetting() {
    console.log('buyBetting');
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

  phoneNumChange(ev) {
    console.log(ev);

    if (ev.length > 10) {
      if (this.type == 'power') this.verifyElectricity();
      if (this.type == 'cable') this.verifyCable();
      if (this.type == 'education' && this.service.serviceID == 'jamb')
        this.verifyEducation();
    } else {
      // this.error();
      this.verificationData = null;
      console.log('less');
    }
  }
}
