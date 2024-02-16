import { apiResponse, response } from "@/util/server/api";
import {
  readSetting,
  updateSettingByField,
} from "@/util/server/prisma/model/setting";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
  const r = { ...response };
  try {
    const setting = await readSetting();
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: setting,
    };
  } catch (error) {
    r.status = {
      type: "failed",
      code: 400,
    };
    r.resbonse = {
      message: error as string,
      data: undefined,
    };
  }
  return apiResponse(r);
};

export const PATCH = async (req: NextRequest) => {
  const r = { ...response };
  const payload: Prisma.SettingUpdateInput[] = await req.json();
  try {
    const setting = payload.map(async (p) => {
      return await updateSettingByField(p.field as string, p.value as string);
    });
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: setting,
    };
  } catch (error) {
    r.status = {
      type: "failed",
      code: 400,
    };
    r.resbonse = {
      message: error as string,
      data: undefined,
    };
  }
  return apiResponse(r);
};
