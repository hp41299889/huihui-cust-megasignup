import { NextResponse } from "next/server";

type ApiStatusType = "success" | "failed";

interface ApiStatus {
  type: ApiStatusType;
  code: number;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface Response<T> {
  status: ApiStatus;
  resbonse: ApiResponse<T>;
}

export const response: Response<any> = {
  status: {
    type: "failed",
    code: 500,
  },
  resbonse: {
    message: "server error",
    data: undefined,
  },
};

export const apiResponse = <T>(r: Response<T>) => {
  return NextResponse.json(r, { status: r.status.code });
};

export const apiErrorHandler = <T>(r: Response<T>, e: any) => {
  // TODO
  console.error("***api error", e);
  return NextResponse.json(r.resbonse, { status: r.status.code });
};
