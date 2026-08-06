import { getUserMe } from "shared/api/users";

export const getUserInfo = async () => {
  try {
    const response = await getUserMe();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
