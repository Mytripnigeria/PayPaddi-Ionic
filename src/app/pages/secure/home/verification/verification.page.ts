import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { VerificationService } from 'src/app/services/verification/verification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  verification_form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private verify: VerificationService,
    private toastService: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sendEmailVerification();
    this.verification_form = this.formBuilder.group({
      code: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  async sendEmailVerification() {
    // const loader = await this.util.loader('Sending...');
    // loader.present();

    const response = await this.verify.sendEmailVerificaion();
  }

  async activate() {
    const loader = await this.util.loader('Verifying');
    loader.present();
    const response = await this.verify.verifyEmail(
      this.verification_form.value.code
    );
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          response.result.data.message,
          2000
        );
        this.modalController.dismiss({ email: true });
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

  back() {
    this.modalCtrl.dismiss();
  }
}
