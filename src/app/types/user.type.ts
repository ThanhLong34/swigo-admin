export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  uuid: string;
  username: string;
  email: string;
  nickName: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
