export type UserRole = 'admin' | 'trabajador';



export interface BrandDoc {
  name: string;
  admins: string[];
  createdAt: Date;
}

export interface ItemDoc {
  name: string;
  price: number;
}

export interface TaskDoc {
  name: string;
  price: number;
}

export interface ClientDoc {
  name: string;
  email?: string;
  measurements: {
    busto?: number;
    cintura?: number;
    pecho?: number;
    cuello?: number;
    brazos?: number;
    piernas?: number;
    [key: string]: number | undefined;
  };
  photos: string[];
  createdAt: Date;
  createdBy: string;
}


export interface QuoteDoc {
  clientId: string;
  clientName: string;
  item: {
    id: string;
    name: string;
    price: number;
  };
  tasks: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdBy: string;
  createdAt: Date;
}

export interface StoreDoc {
  address: string;
  city: string;
  phone: number;
  region: string;
  zipcode: number
}