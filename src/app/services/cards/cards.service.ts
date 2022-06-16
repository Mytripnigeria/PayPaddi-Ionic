import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { ICardCreate } from 'src/app/models/cardCreate';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private req: RequestService) {}

  async createCard(data: ICardCreate) {
    return await this.req.axiosPost('wallet/create-virtual-card', data);
  }
  async getCards() {
    return await this.req.axiosGet('cards');
  }
  async getSingleCard(id) {
    return await this.req.axiosGet(`card/${id}`);
  }
  async fundCard(data) {
    return await this.req.axiosPost('wallet/fund-virtual-card', data);
  }
  async withdrawFromCard(data) {
    return await this.req.axiosPost('wallet/withdraw-virtual-card', data);
  }
  async freezeCard(data) {
    return await this.req.axiosPost('wallet/status-action-virtual-card', data);
  }
  async getCardTransactions(data) {
    return await this.req.axiosPost('wallet/transactions-virtual-card', data);
  }
  async deleteCard(data) {
    return await this.req.axiosPost('wallet/terminate_virtual_card', data);
  }
}
