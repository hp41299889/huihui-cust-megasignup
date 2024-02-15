import { prisma } from "../prisma";

import { errorHandler } from "../../error";

const { setting } = prisma;

export const readSettingByField = async (field: string) => {
  try {
    return await setting.findFirst({ where: { field } });
  } catch (error) {
    throw errorHandler("read setting failed", error);
  }
};

export const updateSettingByField = async (field: string, value: string) => {
  try {
    return await setting.update({
      where: { field },
      data: {
        value,
      },
    });
  } catch (error) {
    throw errorHandler("update setting failed", error);
  }
};
