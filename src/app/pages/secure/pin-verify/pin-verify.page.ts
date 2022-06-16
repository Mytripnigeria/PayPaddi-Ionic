import { DataService } from './../../../services/data/data.service';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-pin-verify',
  templateUrl: './pin-verify.page.html',
  styleUrls: ['./pin-verify.page.scss'],
})
export class PinVerifyPage implements OnInit {
  verify_pin_form: FormGroup;
  submit_attempt: boolean = false;
  input = [];
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private auth: AuthService,
    private util: UtilityService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Setup form
  }

  // Format credit

  // Cancel
  cancel() {
    // Dismiss modal
    this.modalController.dismiss({ success: false });
  }
  appendValue(value) {
    if (this.input.length < 4) {
      console.log(value, '==>', this.input);

      if (value == 'minus') {
        if (this.input.length !== 0) {
          this.input.pop();
        }
      } else {
        this.input.push(value);
        if (this.input.length > 3) {
          console.log(this.input.join(''));
          this.verify(this.input.join(''));
        }
      }
    } else {
      if (value == 'minus') this.input.pop();
    }
  }

  // Save card
  async verify(pin) {
    this.submit_attempt = true;

    const user = this.dataService.getUserProfile();
    if (pin === user.pin) {
      this.modalController.dismiss({ success: true });
    } else {
      this.input = [];
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Incorrect Pin',
        2000
      );
    }

    // If form valid
  }
}
