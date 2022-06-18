import {
  IVerifyElectricity,
  IBuyElectricity,
  IBuyAirtime,
  IBuyData,
  IVerifyEducation,
  IBuyEducation,
  IBuyTV,
  IVerifyTV,
  IVerifyBetting,
  IBuyBetting,
} from './../../models/bills';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillpaymentService {
  constructor(private req: RequestService) {}

  async getServicesByIdentifier(identifier) {
    return await this.req.axiosGet(`services/${identifier}`);
  }

  async getServicesByServiceID(serviceId) {
    return await this.req.axiosGet(`services/variations/${serviceId}`);
  }

  async verifyElectricity(payload: IVerifyElectricity) {
    return await this.req.axiosPost(`electricity/verification`, payload);
  }

  async buyElectricity(payload: IBuyElectricity) {
    return await this.req.axiosPost(`buy/electricity`, payload);
  }

  async buyAirtime(payload: IBuyAirtime) {
    return await this.req.axiosPost(`buy/airtime`, payload);
  }
  async buyData(payload: IBuyData) {
    return await this.req.axiosPost(`buy/data`, payload);
  }

  async verifyEducation(payload: IVerifyEducation) {
    return await this.req.axiosPost(`education/verificcation`, payload);
  }

  async buyEducation(payload: IBuyEducation) {
    return await this.req.axiosPost(`buy/education`, payload);
  }

  async verifyTV(payload: IVerifyTV) {
    return await this.req.axiosPost(`tv/verificcation`, payload);
  }

  async buyTV(payload: IBuyTV) {
    return await this.req.axiosPost(`buy/tv`, payload);
  }
  async getBetting() {
    return await this.req.axiosGet(`betting/billers/all`);
  }

  async verifyBetting(payload: IVerifyBetting) {
    return await this.req.axiosPost(`betting/verificcation`, payload);
  }

  async buyBetting(payload: IBuyBetting) {
    return await this.req.axiosPost(`buy/betting`, payload);
  }
}
