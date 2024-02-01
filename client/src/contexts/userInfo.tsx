import { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import jwt_decode from "jwt-decode";

export type UserInfo = {
  data: {
    username: string;
    _id: string;
  };
  exp: number;
  iat: number;
} | null;

export const UserContext = createContext<UserInfo | null>(null);

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token }: any = useAuth();

  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  useEffect(() => {
    if (token) {
      const info: UserInfo = jwt_decode(token);
      setUserInfo(info);
    }
  }, [token]);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
