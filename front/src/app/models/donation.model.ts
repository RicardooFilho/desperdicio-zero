import { Vendor } from './vendor.model';
import { Food } from './food.model';

export interface Donation {
  id?: number;
  description: string;
  status: DonationStatus;
  vendor?: Vendor;
  items?: DonationItem[];
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface DonationItem {
  id?: number;
  donation?: Donation;
  food?: Food;
  quantity: number;
}

export enum DonationStatus {
  DISPONIVEL = 'DISPONIVEL',
  COLETADO = 'COLETADO',
  CANCELADO = 'CANCELADO'
}