export interface ICardTransaction {
  id: number;
  amount: number;
  fee: number;
  product: string;
  gateway_reference_details: string;
  reference: string;
  response_code: number;
  gateway_reference: string;
  amount_confirmed: number;
  narration: string;
  indicator: string;
  created_at: string;
  status: string;
  response_message: string;
  currency: string;
}
