import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-id-verification',
  templateUrl: './id-verification.page.html',
  styleUrls: ['./id-verification.page.scss'],
})
export class IdVerificationPage implements OnInit {
  verification_form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.verification_form = this.formBuilder.group({
      bvn: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
      id_type: ['', Validators.compose([Validators.required])],
      id_number: ['', Validators.compose([Validators.required])],
      front_picture: ['', Validators.compose([Validators.required])],
      back_picture: ['', Validators.compose([Validators.required])],
    });
  }

  activate() {}

  back() {
    this.modalCtrl.dismiss();
  }

  uploadFrontPicture() {
    this.camera();
  }

  uploadBackPicture() {
    this.camera();
  }

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      var imageUrl = image.webPath;
    } catch (error) {
      console.log(error);
    }
  }
}
