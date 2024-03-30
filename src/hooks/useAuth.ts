import { useQuery } from "@tanstack/react-query";
import baseService from "@/https/base.service";

type userDataType = {
  email: string;
  password: string;
};
const fetchLoginUser = async (
  userData: Record<string, string>,
) => {
  baseService
    .post<userDataType>("/login", userData)
    .then((res) => {
      console.log(res, "res");
    });
};

export const useAuthLogin = (
  user: userDataType,
) => {
  return useQuery({
    queryKey: ["user", user],
    queryFn: () => fetchLoginUser(user),
  });
};
