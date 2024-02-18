"use client";
import { Box, Unstable_Grid2 as Grid } from "@mui/material";

import { getSignup } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import SignupTable from "@/component/table/signup";
import SettingForm from "@/component/form/setting";
import ExportExcelButton from "@/component/button/exportExcel";

const Page = () => {
  const [signups, mutateSignups] = useFetchData("signup", getSignup);

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid xs={4} lg={1}>
          <ExportExcelButton signups={signups ?? []} />
        </Grid>
        <Grid xs={12} lg={4} lgOffset={7}>
          <SettingForm />
        </Grid>
      </Grid>
      {signups && (
        <SignupTable signups={signups} mutateSignups={mutateSignups} />
      )}
    </Box>
  );
};

export default Page;
