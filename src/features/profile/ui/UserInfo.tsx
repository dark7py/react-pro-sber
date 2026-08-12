import { useEffect, useState } from "react";
import { getUserInfo } from "../model/getUserInfo";
import type { UserResponse } from "shared/api/users";

export const UserInfo = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <p>Имя:{user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};
