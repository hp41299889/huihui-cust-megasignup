import { NextRequest } from "next/server";

import { apiResponse, response } from "@/util/server/api";
import { readSignupByPhone } from "@/util/server/prisma/model/signup";

export const GET = async (
  _: NextRequest,
  { params }: { params: { phone: string } }
) => {
  const r = { ...response };
  const { phone } = params;
  try {
    const signup = await readSignupByPhone(phone);
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: signup,
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
