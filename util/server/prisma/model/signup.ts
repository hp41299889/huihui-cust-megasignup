import { Prisma } from "@prisma/client";

import { prisma } from "../prisma";
import { errorHandler } from "../../error";

const { signup } = prisma;

export const createSignup = async (p: Prisma.SignupCreateInput) => {
  try {
    return await signup.create({ data: p });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw errorHandler("該電話號碼已報名，請以其他電話號碼嘗試", error);
      }
    }
    throw errorHandler("create signup failed", error);
  }
};

export const readSignup = async () => {
  try {
    return await signup.findMany({
      orderBy: {
        id: "asc",
      },
    });
  } catch (error) {
    throw errorHandler("read signup failed", error);
  }
};

export const readSignupByPhone = async (phone: string) => {
  try {
    return await signup.findFirst({ where: { phone } });
  } catch (error) {
    throw errorHandler("read signup failed", error);
  }
};

export const readSignupCount = async () => {
  try {
    return (await signup.aggregate({ _sum: { signupNumbers: true } }))._sum
      .signupNumbers;
  } catch (error) {
    throw errorHandler("read signup failed", error);
  }
};

export const updateSignup = async (id: number, p: Prisma.SignupUpdateInput) => {
  try {
    return await signup.update({ where: { id }, data: p });
  } catch (error) {
    throw errorHandler("update signup failed", error);
  }
};

export const deleteSignup = async (id: number) => {
  try {
    return await signup.delete({ where: { id } });
  } catch (error) {
    throw errorHandler("delete signup failed", error);
  }
};

export const deleteSignups = async (ids: number[]) => {
  try {
    return await signup.deleteMany({ where: { id: { in: ids } } });
  } catch (error) {
    throw errorHandler("delete signup failed", error);
  }
};
