"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CheckinForm from "@/component/form/checkin";
import { Signup } from "@prisma/client";
import VerifyForm from "@/component/form/verify";

const Page = () => {
  const [verifyOpen, setVerifyOpen] = useState<boolean>(false);
  const [signup, setSignup] = useState<Signup>();

  return (
    <>
      <Dialog open>
        <DialogTitle>報到查詢</DialogTitle>
        <DialogContent>
          <CheckinForm setVerifyOpen={setVerifyOpen} setSignup={setSignup} />
        </DialogContent>
      </Dialog>
      <Dialog open={verifyOpen}>
        <DialogTitle>報到確認</DialogTitle>
        <DialogContent>
          {signup && (
            <VerifyForm signup={signup} setVerifyOpen={setVerifyOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Page;
