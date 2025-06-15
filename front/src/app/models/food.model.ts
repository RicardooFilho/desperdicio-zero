export interface Food {
  id?: number;
  name: string;
  description?: string;
  category: Category;
  perishable?: boolean;
  shelfLife?: number;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export enum Category {
  FRUTA = 'FRUTA',
  VERDURA = 'VERDURA',
  LEGUME = 'LEGUME',
  GRAO = 'GRAO',
  SALGADO = 'SALGADO',
  DOCE = 'DOCE'
}
