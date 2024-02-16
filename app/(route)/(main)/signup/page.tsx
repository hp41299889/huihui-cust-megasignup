"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import dayjs from "dayjs";

import SignupForm from "@/component/form/signup";
import { getSetting } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import { useRouter } from "next/navigation";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "@/component/feedback/alert";

const Page = () => {
  const [setting, mutateSetting] = useFetchData("setting", getSetting);
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const router = useRouter();

  useEffect(() => {
    if (setting) {
      const deadlineSetting = setting.find(
        (s) => s.field === "signupDeadline"
      )?.value;
      const deadline = dayjs(deadlineSetting);
      const today = dayjs();
      if (deadline.isBefore(today)) {
        const redirect = () => router.push("/home");
        setAlertType("warning");
        alert("報名已截止，將重導回首頁");
        setTimeout(redirect, 3000);
      }
    }
  }, [setting]);

  return (
    <Box paddingTop={"4rem"} paddingInline={"4rem"}>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <SignupForm />
    </Box>
  );
};

export default Page;
