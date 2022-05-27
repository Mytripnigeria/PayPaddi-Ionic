import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.page.html',
  styleUrls: ['./update-pin.page.scss'],
})
export class UpdatePinPage implements OnInit {
  add_card_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Setup form
    this.add_card_form = this.formBuilder.group({
      pin: ['', Validators.required],
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
    if (this.add_card_form.valid) {
      // Loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Saving card...</p><span>Please be patient.</span>',
        spinner: 'crescent',
      });
      await loading.present();

      // Add save logic here ...
      // ...

      // Fake timeout
      setTimeout(() => {
        // Dismiss modal
        this.modalController.dismiss();

        loading.dismiss();
      }, 2000);
    }
  }
}
