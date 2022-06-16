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
  constructor(
    private toateService: ToastService,
    private userService: UserService,
    private clipBoard: ClipboardService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getCode();
    this.getReferrals();
  }

  async getCode() {
    const response = await this.userService.getReferralCode();
    console.log(response);
    if (!response.error) {
      if (!response.result.data.error)
        this.referalCode = response.result.data.data;
    }
  }

  async getReferrals() {
    const response = await this.userService.getReferrals();
    console.log(response);
    if (!response.error) {
      if (!response.result.data.error)
        this.referals = response.result.data.data;
    }
  }

  copy() {
    this.clipBoard.copy(this.referalCode);
    this.toateService.presentToast('Copied', 'top', 'success', '', 2000);
  }
}
