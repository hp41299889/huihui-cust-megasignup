"use client";
import { Box } from "@mui/material";

import { getSignup } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import SignupTable from "@/component/table/signup";
import SignupLimitForm from "@/component/form/signupLimit";

const Page = () => {
  const [signups, mutateSignups] = useFetchData("signup", getSignup);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} paddingBlock={2}>
        <Box>s</Box>
        <SignupLimitForm />
      </Box>
      {signups && <SignupTable signups={signups} />}
    </Box>
  );
};

export default Page;
