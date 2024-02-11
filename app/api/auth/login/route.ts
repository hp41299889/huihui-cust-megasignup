import { NextRequest } from "next/server";

import { apiResponse, response } from "@/util/server/api";
import { login } from "@/util/server/auth";

export interface PostLogin {
  username: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostLogin = await req.json();
  try {
    const auth = await login(payload.username, payload.password);
    if (!auth) {
      throw "auth failed";
    }
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: "login success",
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
