import { NextRequest } from "next/server";
import { Signup } from "@prisma/client";

import { apiErrorHandler, apiResponse, response } from "@/util/server/api";
import { signup } from "@/util/server/prisma/prisma";

export const GET = async () => {
  const r = { ...response };
  try {
    const signups = await signup.findMany();
    r.resbonse = {
      message: "OK",
      data: signups,
    };
  } catch (e) {
    throw apiErrorHandler(r, e);
  }
  r.status = {
    type: "success",
    code: 200,
  };
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: Signup = await req.json();
  try {
    const s = await signup.create({ data: payload });
    r.resbonse = {
      message: "OK",
      data: s,
    };
  } catch (e) {
    throw apiErrorHandler(r, e);
  }
  r.status = {
    type: "success",
    code: 201,
  };
  return apiResponse(r);
};
