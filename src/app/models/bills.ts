export interface IVerifyElectricity {
  billers_code: string;
  service_id: string;
  type: string;
  amount: string;
  phone: string;
}

export interface IBuyElectricity {
  billers_code: string;
  service_id: string;
  type: string;
  amount: string;
  phone: string;
}

export interface IVerifyEducation {
  billers_code: string;
  service_id: string;
}

export interface IBuyEducation {
  service_id: string;
  variation_code: string;
  amount: string;
  phone: string;
  billers_code: string;
}

export interface IBuyAirtime {
  amount: string;
  phone: string;
  service_id: string;
}

export interface IBuyData {
  amount: string;
  phone: string;
  service_id: string;
  variation_code: string;
}

export interface IVerifyTV {
  billers_code: number;
  service_id: string;
}

export interface IBuyTV {
  billers_code: number;
  service_id: string;
  phone: string;
  amount: string;
  variation_code: string;
}

export interface IVerifyBetting {
  biller: string;
  better_id: string;
}

export interface IBuyBetting {
  biller: string;
  better_id: string;
  amount: number;
}
