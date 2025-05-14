import { Timestamp } from "firebase/firestore";

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
  id: string;
  name: string;
  phone: number;
  email: string;
  measurements: {
    ancho_de_espalda                    : number;
    alto_de_busto                       : number;
    contorno_de_brazo                   : number;
    contorno_de_busto                   : number;
    contorno_de_cintura                 : number;
    contorno_de_cadera                  : number;
    largo_del_brazo                     : number;
    largo_del_vestido_por_detras__cola__: number;
    largo_desde_hombro_al_suelo			    : number;
  };
  photos: string[];
  createdAt: Timestamp;
  createdBy: string;
  createdByTempName: string;
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