import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.page.html',
  styleUrls: ['./next-of-kin.page.scss'],
})
export class NextOfKinPage implements OnInit {
  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      name_first: ['', Validators.required],
      name_last: ['', Validators.required],
      home_address: ['', Validators.required],
      relationship: ['', Validators.required],
      phone_number: ['', Validators.required],
    });

    // DEBUG: Prefill inputs
    this.edit_profile_form.get('name_first').setValue('John');
    this.edit_profile_form.get('name_last').setValue('Doe');
  }

  // Update profile picture
  async updateProfilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose existing picture or take new',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Choose from gallery',
          icon: 'images',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  // Submit form
  submit() {
    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {
      // Save form ...

      // Display success message and go back
      this.toastService.presentToast(
        'Success',
        'Profile saved',
        'top',
        'success',
        2000
      );
      this.navController.back();
    } else {
      // Display error message
      this.toastService.presentToast(
        'Error',
        'Please fill in all required fields',
        'top',
        'danger',
        2000
      );
    }
  }
}
