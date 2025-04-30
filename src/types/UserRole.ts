export enum UserRole {
  admin = 'admin',
  trabajador = 'trabajador',
}
export interface AppUser {
  uid: string;
  name: string;
  lastName: string;
  storeId: string;
  email: string;
  role: UserRole;
  brandId: string;
}
