import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.page.html',
  styleUrls: ['./fund-card.page.scss'],
})
export class FundCardPage implements OnInit {
  add_card_form: FormGroup;
  submit_attempt: boolean = false;
  type: string = '';

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private navParam: NavParams
  ) {}

  ngOnInit() {
    this.type = this.navParam.data.type;
    // Setup form
    this.add_card_form = this.formBuilder.group({
      amount: ['', Validators.required],
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
