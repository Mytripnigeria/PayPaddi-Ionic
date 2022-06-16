export interface ICard {
  id: string;
  account_id: number;
  amount: string;
  currency: string;
  card_hash: string;
  card_pan: string;
  masked_pan: string;
  city: string;
  state: string;
  address_1: string;
  address_2: string;
  zip_code: string;
  cvv: string;
  expiration: string;
  send_to: string;
  bin_check_name: string;
  card_type: string;
  name_on_card: string;
  created_at: string;
  is_active: boolean;
  callback_url: string;
  syncing?: boolean;
}
