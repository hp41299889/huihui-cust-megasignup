import {
  Box,
  Button,
  InputLabel,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

import { useFetchData } from "@/util/client/hook/useFetchData";
import { getSetting } from "@/util/client/api";
import { patchSettings } from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";

const SettingForm = () => {
  const [setting, mutateSetting] = useFetchData("setting", getSetting);
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const { register, setValue, handleSubmit } =
    useForm<Prisma.SettingUpdateInput[]>();

  const signupLimit = setting?.find((s) => s.field === "signupLimit")?.value;
  const signupDeadline = setting?.find(
    (s) => s.field === "signupDeadline"
  )?.value;

  // not good
  const onSubmit = async (payload: any) => {
    try {
      setValue("0.field", "signupDeadline");
      setValue("1.field", "signupLimit");
      const p: Prisma.SettingUpdateInput[] = Object.keys(payload).map(
        (k: string) => payload[k]
      );
      const res = await patchSettings(p);
      if (res.data.status.type === "success") {
        setAlertType("success");
        alert("儲存完成");
      }
      mutateSetting();
    } catch (error) {
      setAlertType("error");
      alert("got error");
    }
  };

  useEffect(() => {
    if (signupDeadline) {
      setValue("0.value", signupDeadline);
    }
    if (signupLimit) {
      setValue("1.value", signupLimit);
    }
  }, [setting]);

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <Grid container spacing={1}>
        <Grid xs={12} lg={5}>
          <InputLabel>報名截止日</InputLabel>
          <TextField fullWidth {...register("0.value")} variant="standard" />
        </Grid>
        <Grid xs={12} lg={5}>
          <InputLabel>報名人數上限</InputLabel>
          <TextField fullWidth {...register("1.value")} variant="standard" />
        </Grid>
        <Grid xsOffset={4.5} lg={2} lgOffset={0}>
          <Button type="submit" variant="contained">
            儲存
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingForm;
