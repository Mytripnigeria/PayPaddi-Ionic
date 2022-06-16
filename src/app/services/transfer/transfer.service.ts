import { DataService } from './../data/data.service';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

export interface ITransferWallet {
  username: string;
  amount: number;
  balance: string;
}

export interface ITransferBank {
  bank_code: string;
  account_number: string;
  amount: number;
  account_name: string;
  narration: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private req: RequestService) {}

  async sendToWallet(payload: ITransferWallet) {
    return await this.req.axiosPost('transfer/wallet', payload);
  }
  async sendToBank(data) {
    return await this.req.axiosPost('bank/transfer', data);
  }
  async getAllBanks() {
    return await this.req.axiosGet('banks');
  }
  async verifyBank(payload: { bank_code: string; account_number: string }) {
    return await this.req.axiosPost('bank/verification', payload);
  }
  async verifyUser(username) {
    return await this.req.axiosGet(`user/${username}`);
  }

  async addToBeneficiaries(payload) {
    return await this.req.axiosPost('save/beneficiary', payload);
  }
  async getBeneficiaries() {
    return await this.req.axiosGet('all/beneficiary');
  }

  async getbankAccounts(data) {
    return await this.req.axiosPost('wallet/create-virtual-account', data);
  }
}
