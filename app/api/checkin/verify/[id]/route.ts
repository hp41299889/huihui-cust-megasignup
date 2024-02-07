import { NextRequest } from "next/server";

import { apiResponse, response } from "@/util/server/api";
import { updateSignup } from "@/util/server/prisma/model/signup";

export const PATCH = async (
  _: NextRequest,
  { params }: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = params;
  try {
    const signup = await updateSignup(id, { isVerify: true });
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
