import { CardsService } from 'src/app/services/cards/cards.service';
import { TransferService } from './../transfer/transfer.service';
import { ICard } from './../../models/cards';
import { INOK } from './../../models/nextOfKin';
import { UserService } from './../user/user.service';
import { IUser } from './../../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userProfile: IUser;
  nextOfKin: INOK;
  accounts: [];
  beneficiaries: [];
  params: false;
  cards: ICard[];
  transactions = [];
  limits: any;
  banks: [];
  constructor(
    private userService: UserService,
    private transferService: TransferService,
    private cardsService: CardsService
  ) {}

  setUserData(data: IUser) {
    this.userProfile = data;
  }

  getUserProfile() {
    return this.userProfile;
  }

  setParams(data) {
    this.params = data;
  }

  getParams() {
    return this.params;
  }

  setBanks(data) {
    this.banks = data;
  }
  getBanksData() {
    return this.banks;
  }

  setBeneficiaries(data) {
    this.beneficiaries = data;
  }
  getBeneficiariesData() {
    return this.beneficiaries;
  }

  setCards(data) {
    this.cards = data;
  }
  getCardsData() {
    return this.cards;
  }

  setBankAccount(data) {
    this.accounts = data;
  }
  getBankAccount() {
    return this.accounts;
  }

  setUserNextofKin(data: INOK) {
    this.nextOfKin = data;
  }
  getUserNextofKin() {
    return this.nextOfKin;
  }

  setTransferLimit(data) {
    this.limits = data;
  }
  async setTransactions(data) {
    // console.log('settin', data);
    this.transactions = data;
  }

  getTransactions() {
    return this.transactions.reverse();
  }

  getTransferLimit() {
    return this.limits;
  }

  async commitUser() {
    const userData = await this.userService.getUserProfile();
    // console.log('userData', userData);
    if (!userData.result.data.error) {
      this.setUserData(userData.result.data.data);
    }
  }
  async commitNextOfKin() {
    const NextofKinData = await this.userService.getNextOfKin();
    // console.log('userData', userData);
    if (!NextofKinData.result.data.error) {
      this.setUserNextofKin(NextofKinData.result.data.data);
    }
  }
  async commitBeneficiaries() {
    const beneficiaries = await this.transferService.getBeneficiaries();
    if (beneficiaries.result && !beneficiaries.result.data.error) {
      this.setBeneficiaries(beneficiaries.result.data.data);
    }
  }

  async commitAllData() {
    const userData = await this.userService.getUserProfile();
    const userNextofKin = await this.userService.getNextOfKin();
    // const banks = await this.transferService.getAllBanks();
    // const beneficiaries = await this.transferService.getBeneficiaries();
    const limits = await this.transferService.getTransferLimit();

    this.cardsService.getCards().then((cards) => {
      if (cards.result && !cards.result.data.error) {
        this.setCards(cards.result.data.data);
      }
    });

    console.log('userNextofKin', userNextofKin);
    if (userData.result && !userData.result.data.error) {
      this.setUserData(userData.result.data.data);
    }
    if (userNextofKin.result && !userNextofKin.result.data.error) {
      this.setUserNextofKin(userNextofKin.result.data.data);
    }
    // if (banks.result && !banks.result.data.error) {
    //   this.setBanks(banks.result.data.data);
    // }
    // if (beneficiaries.result && !beneficiaries.result.data.error) {
    //   this.setBeneficiaries(beneficiaries.result.data.data);
    // }

    if (limits.result) {
      this.setTransferLimit(limits.result.data.data);
    }
  }
}
