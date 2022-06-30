import { ToastService } from './../../../../../services/toast/toast.service';
import { UtilityService } from './../../../../../services/utility/utility.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { VerificationService } from 'src/app/services/verification/verification.service';
@Component({
  selector: 'app-id-verification',
  templateUrl: './id-verification.page.html',
  styleUrls: ['./id-verification.page.scss'],
})
export class IdVerificationPage implements OnInit {
  verification_form: FormGroup;
  frontImage = null;
  backImage = null;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private verify: VerificationService,
    private toastService: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.verification_form = this.formBuilder.group({
      type: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      front_picture: [''],
      back_picture: [''],
    });
  }

  async activate() {
    const loader = await this.util.loader('Verifying');
    loader.present();
    const response = await this.verify.verifyID(this.verification_form.value);
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
        this.modalController.dismiss({ kyc2: true });
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

  async uploadFrontPicture() {
    this.frontImage = await this.camera();
    if (this.frontImage)
      this.verification_form.value.front_picture = this.frontImage;
  }

  async uploadBackPicture() {
    this.backImage = await this.camera();
    if (this.backImage)
      this.verification_form.value.back_picture = this.backImage;
  }

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });

      var imageUrl = image.base64String;

      console.log(image);
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  }
}
