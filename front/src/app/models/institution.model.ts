import { Person } from './person.model';

export interface Institution {
  id?: number;
  name: string;
  description?: string;
  cnpj?: string;
  capacity?: number;
  owner?: Person;
  institutionType: InstitutionType;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export enum InstitutionType {
  ONG = 'ONG',
  ABRIGO = 'ABRIGO',
  ESCOLA = 'ESCOLA'
}
