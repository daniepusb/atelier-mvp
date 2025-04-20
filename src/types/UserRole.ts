export type UserRole = 'admin' | 'trabajador';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  brandId: string;
}
