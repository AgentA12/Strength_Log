import { createContext } from "react";
import auth from "../utils/auth/auth";

export type UserInfo = {
  data: {
    username: string;
    _id: string;
  };
  exp: number;
  iat: number;
};

export const userInfo = auth.getInfo();
export const UserContext = createContext(userInfo);
