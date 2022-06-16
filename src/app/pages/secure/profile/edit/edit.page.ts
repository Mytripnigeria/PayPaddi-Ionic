import { IUser } from './../../../../models/user';
import { CameraService } from './../../../../services/camera/camera.service';
import { UserService } from './../../../../services/user/user.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { DataService } from './../../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;
  userData: IUser = null;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private util: UtilityService,
    private dataService: DataService,
    private cameraService: CameraService,
    private userService: UserService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    // Setup form
    // DEBUG: Prefill inputs
    // this.edit_profile_form.get('name_first').setValue('John');
    // this.edit_profile_form.get('name_last').setValue('Doe');
  }

  ionViewWillEnter() {
    this.userData = this.dataService.getUserProfile();
    this.edit_profile_form = this.formBuilder.group({
      firstname: [this.userData.firstname, Validators.required],
      lastname: [this.userData.lastname, Validators.required],
      username: [this.userData.username, Validators.required],
      email: [this.userData.email, Validators.required],
      phone: [this.userData.phone, Validators.required],
    });
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
          handler: async () => {
            const images = await this.cameraService.selectImage();

            this.uploadImage(images[0]);
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
  async submit() {
    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {
      const loader = await this.util.loader('Updating');
      loader.present();
      const result = await this.userService.updateProfile(
        this.edit_profile_form.value
      );
      loader.dismiss();
      if (!result.error) {
        console.log(result);
        await this.dataService.commitUser();

        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Profile saved',
          2000
        );
        this.navController.navigateBack(['/settings']);
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to update profile',
          2000
        );
      }
    } else {
      // Display error message
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Please fill in all required fields',
        2000
      );
    }
  }

  async uploadImage(image) {
    const loader = await this.util.loader('Uploading Image...');
    loader.present();
    const uplaodResult = await this.cameraService.uploadImage(image);
    loader.dismiss();
    if (uplaodResult.result) {
      if (!uplaodResult.result.data.error) {
        this.userData.picture = image.data;
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Uploaded successfully',
          2000
        );
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Unable to upload Image',
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to upload Image',
        2000
      );
    }

    console.log('Upload result==>', uplaodResult);
  }
}
