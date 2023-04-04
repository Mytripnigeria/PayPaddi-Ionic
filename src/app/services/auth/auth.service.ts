import { UtilityService } from 'src/app/services/utility/utility.service';
import { ILogin } from './../../models/login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/models/register';
import { RequestService } from '../request/request.service';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private util: UtilityService,
    private req: RequestService
  ) {}

  // Get user session
  async getSession() {
    // ...
    // put auth session here
    // ...

    // Sample only - remove this after real authentication / session
    let session = {
      email: 'john.doe@mail.com',
    };

    return false;
    // return session;
  }

  // Sign in
  async signIn(data: ILogin) {
    return await this.req.axiosPost('login', data);
  }

  // Sign up
  async signUp(data: IRegister) {
    return await this.req.axiosPost('register', data);

    // return sample_user;
  }

  async updatePin(pin) {
    return await this.req.axiosPost('update/pin', pin);
  }

  async changePassword(data: ILogin) {
    return await this.req.axiosPost('login', data);
  }

  // Sign out
  async signOut() {
    // ...
    // clean subscriptions / local storage etc. here
    // ...

    // Navigate to sign-in
    await Preferences.remove({
      key: 'accessToken',
    });

    this.router.navigateByUrl('/signin');
  }

  async resetPassword(email: string) {
    return await this.req.axiosPost('password-reset', { email });
  }
}
