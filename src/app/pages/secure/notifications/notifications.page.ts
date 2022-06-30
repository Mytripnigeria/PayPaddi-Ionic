import { NavParams, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.notifications = this.navParams.data.notifications;
    console.log(this.notifications);
  }

  async gotoLink(link) {
    await Browser.open({ url: link });
  }

  back() {
    this.modalController.dismiss();
  }
}
