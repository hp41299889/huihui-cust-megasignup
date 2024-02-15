import { apiResponse, response } from "@/util/server/api";
import {
  readSettingByField,
  updateSettingByField,
} from "@/util/server/prisma/model/setting";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (_: NextRequest, params: { field: string }) => {
  const r = { ...response };
  const { field } = params;
  try {
    const setting = await readSettingByField(field);
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { field: string } }
) => {
  const r = { ...response };
  const { field } = params;
  const payload: { value: string } = await req.json();
  try {
    const setting = await updateSettingByField(field, payload.value);
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
