"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Checkin from "@/component/checkin";

const Page = () => {
  const [step, setStep] = useState<"checkin" | "verify">("checkin");

  return (
    <Dialog open>
      <DialogTitle>
        {step === "checkin" && "報到"}
        {step === "verify" && "驗證"}
      </DialogTitle>
      <DialogContent>
        {step === "checkin" && <Checkin />}
        {step === "verify" && <></>}
      </DialogContent>
    </Dialog>
  );
};

export default Page;
