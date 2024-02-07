import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import { apiResponse, response } from "@/util/server/api";
import { deleteSignup, updateSignup } from "@/util/server/prisma/model/signup";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = params;
  const payload: Prisma.SignupUpdateInput = await req.json();
  try {
    const signup = await updateSignup(id, payload);
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

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = params;
  try {
    const signup = await deleteSignup(id);
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
