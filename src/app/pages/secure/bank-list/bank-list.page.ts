import { TransferService } from './../../../services/transfer/transfer.service';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from './../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.page.html',
  styleUrls: ['./bank-list.page.scss'],
})
export class BankListPage implements OnInit {
  banks = [];
  banksCopy = [];
  beneficiaries = null;
  variations = null;
  beneficiariesCopy = [];
  services = null;
  servicesCopy = [];
  exception = null;
  variationsCopy = [];
  type = null;
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private navParam: NavParams,
    private transferService: TransferService,
    private util: UtilityService
  ) {}

  ionViewWillEnter() {
    this.type = this.navParam.data.type;
    console.log('the type', this.type);
  }

  ngOnInit() {
    this.type = this.navParam.data.type;
    this.exception = this.navParam.data.exception;
    console.log('the type', this.type);

    if (this.type == 'Bank') {
      this.getBanks();
    } else if (this.type == 'Beneficiary') {
      this.getBeneficiaries();
    } else if (this.type == 'variations') {
      this.variations = this.navParam.data.variations;
      this.variationsCopy = this.variations;
    } else {
      this.services = this.navParam.data.services;
      this.servicesCopy = this.services;
    }
  }

  async getBanks() {
    const loader = await this.util.loader('Fetching Banks');
    loader.present();
    const response = await this.transferService.getAllBanks();
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.banks = response.result.data.data;
        this.banksCopy = this.banks;
      } else {
        // this.toastService.presentToast(
        //   'Error',
        //   'top',
        //   'danger',
        //   response.result.data.message,
        //   2000
        // );
      }
    } else {
      //
    }
  }

  async getBeneficiaries() {
    const loader = await this.util.loader('Fetching Beneficiaries');
    loader.present();
    const response = await this.transferService.getBeneficiaries();
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.beneficiaries = response.result.data.data;
        this.beneficiariesCopy = this.beneficiaries;
      } else {
        // this.toastService.presentToast(
        //   'Error',
        //   'top',
        //   'danger',
        //   response.result.data.message,
        //   2000
        // );
      }
    } else {
      //
    }
  }

  selectBank(bank_code, bank_name) {
    this.modalController.dismiss({ bank_code, bank_name });
  }

  selectVariation(variation) {
    this.modalController.dismiss({ variation });
  }
  selectService(service) {
    this.modalController.dismiss({ service });
  }
  selectBeneficiary(payload) {
    this.modalController.dismiss({ payload });
  }

  initializeBanks(): void {
    this.banks = this.banksCopy;
  }
  onSearchBank(evt: any) {
    this.initializeBanks();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.banks = this.banksCopy.filter((bank) => {
      if (bank.bank_name && searchTerm) {
        if (
          bank.bank_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  initializeBeneficiary(): void {
    this.beneficiaries = this.beneficiariesCopy;
  }

  onSearchBeneficiary(evt: any) {
    this.initializeBeneficiary();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.beneficiaries = this.beneficiariesCopy.filter((beneficiary) => {
      if (beneficiary.name && searchTerm) {
        if (
          beneficiary.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  initializeVariations(): void {
    this.beneficiaries = this.beneficiariesCopy;
  }

  onSearchVariations(evt: any) {
    this.initializeVariations();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.variations = this.variationsCopy.filter((variation) => {
      if (variation.name && searchTerm) {
        if (
          variation.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  initializeServices(): void {
    this.services = this.servicesCopy;
  }

  onSearchServices(evt: any) {
    this.initializeServices();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.services = this.servicesCopy.filter((service) => {
      if (service.name && searchTerm) {
        if (service.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
