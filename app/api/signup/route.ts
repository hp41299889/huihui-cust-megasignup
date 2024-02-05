import { NextRequest } from "next/server";
import { Signup } from "@prisma/client";

import { apiErrorHandler, apiResponse, response } from "@/app/_util/server/api";
import { prisma } from "@/app/_util/server/prisma/prisma";

export const GET = async () => {
  const r = { ...response };
  try {
    const signups = await prisma.signup.findMany();
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
    const signup = await prisma.signup.create({ data: payload });
    r.resbonse = {
      message: "OK",
      data: signup,
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
