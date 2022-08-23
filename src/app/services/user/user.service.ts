import { INOK } from './../../models/nextOfKin';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private req: RequestService) {}

  async getUserProfile() {
    return await this.req.axiosGet('profile');
  }
  async updateProfile(data) {
    return await this.req.axiosPost('update/account', data);
  }
  async updateProfilePicture(data) {
    return await this.req.axiosPostFile('update/photo', data);
  }

  async updateNextOfKin(data: INOK) {
    return await this.req.axiosPost('update/next-of-kin', data);
  }
  async getNextOfKin() {
    return await this.req.axiosGet('next-of-kin');
  }

  async getReferralCode() {
    return await this.req.axiosGet('referral_code');
  }
  async getReferralEarnings() {
    return await this.req.axiosGet('referral-earnings');
  }
  async getReferrals() {
    return await this.req.axiosGet('referrals');
  }
  async getUserWallet() {
    return await this.req.axiosGet('balance');
  }
  async getUserFees() {
    return await this.req.axiosGet('fees');
  }
  async getNotifications() {
    return await this.req.axiosGet('all/notifications');
  }
  async getTransferRate(payload) {
    return await this.req.axiosPost('transfer-rates', payload);
  }
  async getStatement(payload) {
    return await this.req.axiosPost('statements', payload);
  }
}
