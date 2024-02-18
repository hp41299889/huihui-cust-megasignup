import { Prisma, Setting, Signup } from "@prisma/client";

import { nextApi } from "./request";
import { Response } from "@/util/server/api";
import { PostLogin } from "@/app/api/auth/login/route";

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

export const getCheckinSignup = async (phone: string) => {
  try {
    return await nextApi.get<Response<Signup>>(`/checkin/signup/${phone}`);
  } catch (error) {
    throw console.error(error);
  }
};

export const patchVerifySignup = async (id: number) => {
  try {
    return await nextApi.patch<Response<Signup>>(`/checkin/verify/${id}`);
  } catch (error) {
    throw console.error(error);
  }
};

export const postLogin = async (payload: PostLogin) => {
  try {
    return await nextApi.post<Response<any>>("/auth/login", payload);
  } catch (error) {
    throw console.error(error);
  }
};

export const getSignupLimit = async () => {
  try {
    return await nextApi.get<Response<Setting>>("/setting/signupLimit");
  } catch (error) {
    throw console.error(error);
  }
};

export const getSetting = async () => {
  try {
    return await nextApi.get<Response<Setting[]>>("/setting");
  } catch (error) {
    throw console.error(error);
  }
};

export const patchSignupLimit = async (payload: Prisma.SettingUpdateInput) => {
  try {
    return await nextApi.patch<Response<Setting>>(
      "/setting/signupLimit",
      payload
    );
  } catch (error) {
    throw console.error(error);
  }
};

export const patchSettings = async (payload: Prisma.SettingUpdateInput[]) => {
  try {
    return await nextApi.patch<Response<Setting[]>>("/setting", payload);
  } catch (error) {
    throw console.error(error);
  }
};

export const getSignupCount = async () => {
  try {
    return await nextApi.get<Response<number>>("/signup/count");
  } catch (error) {
    throw console.error(error);
  }
};

export const deleteSignups = async (ids: number[]) => {
  try {
    return await nextApi.delete<Response<Signup>>("/signup", { data: { ids } });
  } catch (error) {
    throw console.error(error);
  }
};
