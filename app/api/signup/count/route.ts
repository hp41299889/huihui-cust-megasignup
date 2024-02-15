import { apiResponse, response } from "@/util/server/api";
import { readSignupCount } from "@/util/server/prisma/model/signup";

export const GET = async () => {
  const r = { ...response };
  try {
    const signupCount = await readSignupCount();
    r.status = {
      type: "success",
      code: 200,
    };
    r.resbonse = {
      message: "OK",
      data: signupCount,
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
