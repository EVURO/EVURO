export interface userDataType {
  _id: string;
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  profileImage: string;
  isVerified: boolean;
  userType: string;
  Images: any[];
  favorites: any[];
  socialId: string;
  socialSite: string;
  cart: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

export interface loginUserType {
  accessToken: string;
  data: userDataType;
  message: string;
  refreshToken: string;
  status: number;
}
