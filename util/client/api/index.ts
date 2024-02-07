import { Prisma, Signup } from "@prisma/client";

import { nextApi } from "./request";
import { Response } from "@/util/server/api";

export const postSignup = async (payload: Prisma.SignupCreateInput) => {
  try {
    return await nextApi.post<Response<Signup>>("/signup", payload);
  } catch (error) {
    throw console.error(error);
  }
};

export const getSignup = async () => {
  try {
    return await nextApi.get<Response<Signup[]>>("/signup");
  } catch (error) {
    throw console.error(error);
  }
};

export const updateSignup = async (
  id: number,
  payload: Prisma.SignupUpdateInput
) => {
  try {
    return await nextApi.patch<Response<Signup>>(`/signup/${id}`, payload);
  } catch (error) {
    throw console.error(error);
  }
};

export const deleteSignup = async (id: number) => {
  try {
    return await nextApi.delete<Response<Signup>>(`/signup/${id}`);
  } catch (error) {
    throw console.error(error);
  }
};
