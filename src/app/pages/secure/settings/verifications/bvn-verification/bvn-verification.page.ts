import { DataService } from './../../../../../services/data/data.service';
import { ToastService } from './../../../../../services/toast/toast.service';
import { VerificationService } from './../../../../../services/verification/verification.service';
import { UtilityService } from './../../../../../services/utility/utility.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bvn-verification',
  templateUrl: './bvn-verification.page.html',
  styleUrls: ['./bvn-verification.page.scss'],
})
export class BvnVerificationPage implements OnInit {
  verification_form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private verify: VerificationService,
    private toastService: ToastService,
    private modalController: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.verification_form = this.formBuilder.group({
      bvn: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
    });
  }

  async activate() {
    const profile = this.dataService.getUserProfile();
    const loader = await this.util.loader('Verifying');
    loader.present();
    const response = await this.verify.verifyBVN(
      this.verification_form.value.bvn,
      profile.phone
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
        this.modalController.dismiss({ bvn: true });
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
