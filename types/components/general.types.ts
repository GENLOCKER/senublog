export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
export interface AuthCookie {
  accessToken: string;
  user?: User;
}
