import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  referalCode = null;
  referals;
  referalEarnings;
  fees = null;
  constructor(
    private toateService: ToastService,
    private userService: UserService,
    private clipBoard: ClipboardService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getCode();
    this.getFees();
    this.getReferrals();
    this.getEarnings();
  }

  async getCode() {
    const response = await this.userService.getReferralCode();
    // console.log(response);
    if (!response.error) {
      if (!response.result.data.error)
        this.referalCode = response.result.data.data;
    }
  }

  async getReferrals() {
    const response = await this.userService.getReferrals();
    // console.log(response);
    if (!response.error) {
      if (!response.result.data.error)
        this.referals = response.result.data.data;
    }
  }

  async getEarnings() {
    const response = await this.userService.getReferralEarnings();
    console.log(response);
    if (!response.error) {
      if (!response.result.data.error) {
        const allRef = response.result.data.data;
        console.log({ allRef });
        let initialValue = 0;
        for (let index = 0; index < allRef.length; index++) {
          initialValue = initialValue + Number(allRef[index].amount);
        }
        this.referalEarnings = initialValue;
        console.log('earningss==>', this.referalEarnings);
      }
    }
  }

  copy() {
    this.clipBoard.copy(this.referalCode);
    this.toateService.presentToast('Copied', 'top', 'success', '', 2000);
  }

  async getFees() {
    const response = await this.userService.getUserFees();
    console.log(response);
    if (response.result) {
      this.fees = response.result.data.referral;
    } else {
      // fees not fetch
    }
  }
}
