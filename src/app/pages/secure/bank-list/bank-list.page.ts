import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from './../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';

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
  variationsCopy = [];
  type = null;
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private navParam: NavParams
  ) {}

  ionViewWillEnter() {
    this.type = this.navParam.data.type;
    console.log('the type', this.type);
  }

  ngOnInit() {
    this.type = this.navParam.data.type;
    console.log('the type', this.type);

    if (this.type == 'Bank') {
      this.banks = this.dataService.getBanksData();
      console.log(this.banks);
      this.banksCopy = this.banks;
    } else if (this.type == 'Beneficiary') {
      this.beneficiaries = this.dataService.getBeneficiariesData();
      this.beneficiariesCopy = this.beneficiaries;
    } else if (this.type == 'variations') {
      this.variations = this.navParam.data.variations;
      this.variationsCopy = this.variations;
    } else {
      this.services = this.navParam.data.services;
      this.servicesCopy = this.services;
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
