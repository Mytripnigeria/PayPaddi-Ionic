import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private req: RequestService) {}

  async getAllTransactions() {
    return await this.req.axiosGet('transactions');
  }
  async getSingleTransactions() {
    return await this.req.axiosGet('transactions');
  }

  async verifyPayment(reference, amount) {
    return await this.req.axiosPost('verify-topup', { reference, amount });
  }
}
