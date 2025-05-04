import { Timestamp } from 'firebase/firestore';

export enum UserRole {
  admin = 'admin',
  trabajador = 'trabajador',
}
export interface AppUser {
  uid: string;
  brandId: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
  name: string;
  role: UserRole;
  storeId: string;
  createdAt: Timestamp;
  createdBy: string;
  createdByName: string;
}
