import { ToastService } from './../toast/toast.service';
import { Injectable } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {}

  async loader(action) {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: `<p>${action}...</p><span>Please be patient.</span>`,
      spinner: 'crescent',
    });
    return loading;
  }

  async configureLocaStorage() {
    await Storage.configure({
      group: 'PayPaddiData',
    });
  }

  async signout() {
    await Storage.remove({
      key: 'accessToken',
    });
    this.toastService
      .presentToast(
        'Session Expired',
        'top',
        'danger',
        'Please login again',
        2000
      )
      .then(() => {
        this.navCtrl.navigateBack('/signin');
      });
  }

  async storeData(storageName, storageData) {
    await Storage.set({
      key: storageName,
      value: JSON.stringify(storageData),
    });
  }

  async getStorageData(storageName) {
    const value: any = await Storage.get({
      key: storageName,
    });
    return JSON.parse(value);
  }

  async storeItem(storageName, storageData) {
    await Storage.set({
      key: storageName,
      value: storageData,
    });
  }

  async getItem(storageName) {
    const value: any = await Storage.get({
      key: storageName,
    });
    return value;
  }
}
