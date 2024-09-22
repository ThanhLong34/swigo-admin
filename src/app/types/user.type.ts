import { Pagination } from "./pagination.type";

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

export interface GetUserList extends Pagination {
  uuid?: string;
  username?: string;
  email?: string;
  nickName?: string;
}

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  nickName: string;
}
