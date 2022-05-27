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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.verification_form = this.formBuilder.group({
      bvn: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
    });
  }

  activate() {}

  back() {
    this.modalCtrl.dismiss();
  }
}
