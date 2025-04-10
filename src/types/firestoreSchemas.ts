export type UserRole = 'admin' | 'trabajador';

export interface UserDoc {
  email: string;
  role: UserRole;
}

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
}


export interface QuoteDoc {
  clientId: string;
  itemId: string;
  taskIds: string[];
  total: number;
  createdBy: string;
  createdAt: Date;
}
