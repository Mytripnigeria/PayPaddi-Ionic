import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  email: string;
  current_year: number = new Date().getFullYear();

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private util: UtilityService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
  async resentPassword() {
    const loader = await this.util.loader('Requesting');
    loader.present();
    const response = await this.authService.resetPassword(this.email);
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Check your email for the reset instructions',
          2000
        );
        this.navCtrl.navigateBack(['/signin']);
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.message,
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Please retry submission',
        2000
      );
    }
  }
}
