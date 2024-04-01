"use client";
import { Box, Button, Dialog, DialogContent, Unstable_Grid2 as Grid } from "@mui/material";

import { getSignup } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import SignupTable from "@/component/table/signup";
import SettingForm from "@/component/form/setting";
import ExportExcelButton from "@/component/button/exportExcel";
import { useState } from "react";
import SignupForm from "@/component/form/signup";

const Page = () => {
  const [signups, mutateSignups] = useFetchData("signup", getSignup);
  const [signupFormOpen, setSignupFormOpen] = useState<boolean>(false);



  return (
    <Box>
      <Grid container spacing={1}>
        <Grid xs={4} lg={1}>
          <Box display={'flex'}>
            <ExportExcelButton signups={signups ?? []} />
            <Button variant='contained' onClick={() => setSignupFormOpen(true)}>新增報名</Button>
          </Box>
        </Grid>
        <Grid xs={12} lg={4} lgOffset={7}>
          <SettingForm />
        </Grid>
      </Grid>
      {signups && (
        <SignupTable signups={signups} mutateSignups={mutateSignups} />
      )}
      <Dialog 
        open={signupFormOpen} 
        onClose={() => setSignupFormOpen(false)}
        maxWidth='xl'
      >
        <DialogContent>
          <SignupForm />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Page;
