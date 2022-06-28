import { IVerifyID } from './../../models/verify';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(private req: RequestService) {}

  async sendEmailVerificaion() {
    return await this.req.axiosPost('send/verify/email', '');
  }
  async verifyEmail(pin: number) {
    return await this.req.axiosPost('verify/email', {
      email_verification_code: pin,
    });
  }

  async verifyBVN(bvn: string, phone: string) {
    return await this.req.axiosPost('kyc-level-1', {
      bvn,
      phone,
    });
  }

  async verifyID(payload: IVerifyID) {
    return await this.req.axiosPost('kyc-level-2', payload);
  }
}
