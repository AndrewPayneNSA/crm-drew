export type PaymentMethod = 'Cash' | 'Card' | 'Bank Transfer';

export interface Client {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  procedureDetails: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientFormData extends Omit<Client, 'id' | 'createdAt' | 'updatedAt'> {} 