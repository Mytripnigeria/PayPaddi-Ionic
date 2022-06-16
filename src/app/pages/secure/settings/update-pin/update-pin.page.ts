import { UtilityService } from './../../../../services/utility/utility.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.page.html',
  styleUrls: ['./update-pin.page.scss'],
})
export class UpdatePinPage implements OnInit {
  update_pin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private auth: AuthService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    // Setup form
    this.update_pin_form = this.formBuilder.group({
      pin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      ],
    });
  }

  // Format credit

  // Cancel
  cancel() {
    // Dismiss modal
    this.modalController.dismiss();
  }

  // Save card
  async save() {
    this.submit_attempt = true;

    // If form valid
    if (this.update_pin_form.valid) {
      // Loading overlay
      const loader = await this.util.loader('Updating');
      loader.present();

      const result = await this.auth.updatePin(this.update_pin_form.value);
      loader.dismiss();
      console.log(result);
      if (!result.error) {
        if (!result.result.data.error) {
          this.modalController.dismiss();
          this.toastService.presentToast(
            'Success',
            'top',
            'success',
            'PIN Updated',
            2000
          );
        } else {
          this.toastService.presentToast(
            'Error',
            'top',
            'danger',
            'An error occured',
            2000
          );
        }
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'An error occured',
          2000
        );
      }
    }
  }
}
