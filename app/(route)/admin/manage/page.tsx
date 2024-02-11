"use client";
import { Box } from "@mui/material";

import { getSignup } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import SignupTable from "@/component/table/signup";

const Page = () => {
  const [signups, mutateSignups] = useFetchData("signup", getSignup);

  return <Box>{signups && <SignupTable signups={signups} />}</Box>;
};

export default Page;