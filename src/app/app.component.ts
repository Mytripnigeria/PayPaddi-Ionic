import { Router } from '@angular/router';
import { DataService } from './services/data/data.service';
import { UtilityService } from './services/utility/utility.service';
import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { codePush, InstallMode } from 'capacitor-codepush';
import {
  IRemotePackage,
  ILocalPackage,
} from 'capacitor-codepush/dist/esm/package';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private util: UtilityService,
    private dataService: DataService,
    private router: Router,
    private alertCtrl: AlertController,
    private loading: LoadingController
  ) {
    this.initializeApp();
  }

  // Initialize app
  initializeApp() {
    // Wait until platform is ready
    this.platform.ready().then(async () => {
      // If we're on a mobile platform (iOS / Android), not web
      if (Capacitor.getPlatform() !== 'web') {
        this.checkUpdate();
        // Set StatusBar style (dark / light)
        // await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#141A1F' });
      }

      await this.util.configureLocaStorage();

      // ...
      // do some more config and setup if necessary
      // ...

      // Fake timeout since we do not load any data
      setTimeout(async () => {
        // Hide SplashScreen
        await SplashScreen.hide();
      }, 2000);
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(
      10,
      async (processNextHandler) => {
        const loader = await this.loading.getTop();
        if (loader) loader.dismiss();
        if (
          this.router.url === '/' ||
          this.router.url === '/welcome' ||
          this.router.url === '/signin' ||
          this.router.url === '/signup' ||
          this.router.url === '/password-reset'
        ) {
          await this.CloseConfirm();
        } else if (this.router.url === '/home') {
          await this.LogoutConfirm();
        } else if (
          this.router.url === '/cards' ||
          this.router.url === '/settings'
        ) {
          await this.router.navigate(['/home']);
        } else {
          processNextHandler();
        }
      }
    );
  }

  async CloseConfirm() {
    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to exit app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Close App',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }

  async LogoutConfirm() {
    const alert = await this.alertCtrl.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to log out???',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Log out',
          handler: () => {
            this.router.navigate(['/signin']);
          },
        },
      ],
    });

    await alert.present();
  }

  checkUpdate() {
    let deploymentKey;

    if (this.platform.is('ios')) {
      deploymentKey = environment.codePushIosKey;
    } else if (this.platform.is('android')) {
      deploymentKey = environment.codepushAndroidKey;
    }
    // state.isActive contains the active state
    codePush.checkForUpdate(this.success, this.error, deploymentKey);
  }
  async success(remotePackage: IRemotePackage) {
    console.log('URL====>', remotePackage);
    if (!remotePackage) {
      console.log('App is Up to date');
      codePush.notifyApplicationReady();
    } else {
      if (!remotePackage.failedInstall) {
        console.log(
          'A CodePush update is available. Package hash: ',
          remotePackage
        );

        // DOWNLOAD UPDATE
        console.log('Downloading =========--=======>');
        const result: ILocalPackage = await remotePackage.download();
        if (result) {
          result.install({
            installMode: InstallMode.ON_NEXT_RESTART,
            minimumBackgroundDuration: 0,
            mandatoryInstallMode: InstallMode.ON_NEXT_RESTART,
          });
        }
        console.log('Result of download', result);
      } else {
        console.log('The available update was attempted before and failed.');
      }
    }
  }

  onPackageDownloaded(localPackage: ILocalPackage) {
    console.log('Download succeeded.===========>', localPackage.description);
    localPackage
      .install({
        installMode: InstallMode.ON_NEXT_RESTART,
        minimumBackgroundDuration: 0,
        mandatoryInstallMode: InstallMode.ON_NEXT_RESTART,
      })
      .then(this.onInstallSuccess, this.error);
  }

  onInstallSuccess() {
    console.log('Installation succeeded.');

    setTimeout(async () => {
      codePush.restartApplication();
    }, 200);
  }

  error(error) {
    console.log('Error===>', error);
  }
}
