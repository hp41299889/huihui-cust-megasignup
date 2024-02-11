import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import { apiResponse, response } from "@/util/server/api";
import { createSignup, readSignup } from "@/util/server/prisma/model/signup";
import { sendMail } from "@/util/server/mail";

export const GET = async () => {
  const r = { ...response };
  try {
    const signups = await readSignup();
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: signups,
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

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: Prisma.SignupCreateInput = await req.json();
  try {
    const signup = await createSignup(payload);
    const s = await sendMail(payload.email);
    console.log(s);

    r.status = {
      type: "success",
      code: 201,
    };
    r.resbonse = {
      message: "OK",
      data: s,
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
