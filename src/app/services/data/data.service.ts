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
  cards: ICard[];
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
    const banks = await this.transferService.getAllBanks();
    const beneficiaries = await this.transferService.getBeneficiaries();

    const user = userData.result.data.data;
    const bankAccount = await this.transferService.getbankAccounts({
      account_name: user.first_name + ' ' + user.last_name,
      bvn: '',
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    });
    const cards = await this.cardsService.getCards();

    console.log('userNextofKin', userNextofKin);
    if (userData.result && !userData.result.data.error) {
      this.setUserData(userData.result.data.data);
    }
    if (userNextofKin.result && !userNextofKin.result.data.error) {
      this.setUserNextofKin(userNextofKin.result.data.data);
    }
    if (banks.result && !banks.result.data.error) {
      this.setBanks(banks.result.data.data);
    }
    if (beneficiaries.result && !beneficiaries.result.data.error) {
      this.setBeneficiaries(beneficiaries.result.data.data);
    }

    if (cards.result && !cards.result.data.error) {
      this.setCards(cards.result.data.data);
    }
    if (bankAccount.result) {
      this.setBankAccount(bankAccount.result.data.data);
    }
  }
}
