"use client";
import {
  Box,
  Button,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  getSetting,
  getSignupCount,
  getSignupLimit,
  postSignup,
} from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";
import { useFetchData } from "@/util/client/hook/useFetchData";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import dayjs from "dayjs";

const SignupForm = () => {
  const [signupCount, mutateSignupCount] = useFetchData(
    "signupCount",
    getSignupCount
  );
  const [setting, mutateSetting] = useFetchData("setting", getSetting);
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const [signupSelected, setSignupSelected] = useState<number>(2);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Prisma.SignupCreateInput>();
  const router = useRouter();

  const signupLimit = Number(
    setting?.find((s) => s.field === "signupLimit")?.value
  );
  const signupDeadline = setting?.find(
    (s) => s.field === "signupDeadline"
  )?.value;

  const onSubmit = async (payload: Prisma.SignupCreateInput) => {
    try {
      const res = await postSignup(payload);
      if (res.data.status.type === "success") {
        setAlertType("success");
        alert("報名成功，請確認Email以完成驗證");
        reset();
      }
    } catch (error) {
      setAlertType("error");
      if (error instanceof AxiosError) {
        alert(error.response?.data.resbonse.message);
      }
    }
  };

  useEffect(() => {
    mutateSetting();
    mutateSignupCount();
  }, []);

  useEffect(() => {
    const expire = dayjs().isAfter(dayjs(signupDeadline));
    if (expire) {
      setAlertType("warning");
      alert("報名已截止");
      const redirect = () => router.push("/home");
      setTimeout(redirect, 3000);
    }
  }, [signupDeadline]);

  useEffect(() => {
    if (signupSelected !== -1) {
      setValue("signupNumbers", Number(signupSelected));
    } else {
      setValue("signupNumbers", 5);
    }
  }, [signupSelected]);

  useEffect(() => {
    if (signupLimit && signupCount && signupLimit <= signupCount) {
      setAlertType("warning");
      alert("報名人數已達上限！");
      const redirect = () => router.push("/home");
      setTimeout(redirect, 3000);
    }
  }, [signupCount, setting]);

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <Grid
        container
        rowSpacing={"1rem"}
        columnSpacing={{ xs: "2rem", lg: "4rem" }}
      >
        <Grid xs={12} lg={6}>
          <TextField
            fullWidth
            label={"姓名"}
            variant="standard"
            {...register("name", {
              required: { value: true, message: "請輸入姓名" },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid xs={12} lg={6}>
          <TextField
            fullWidth
            label={"手機"}
            variant="standard"
            FormHelperTextProps={{
              sx: { color: "red" },
            }}
            {...register("phone", {
              required: { value: true, message: "請輸入手機" },
            })}
            error={Boolean(errors.phone)}
            helperText={
              errors.phone
                ? errors.phone.message +
                  "\n該手機號碼為活動日報到之依據，請務必再次確認"
                : "該手機號碼為活動日報到之依據，請務必再次確認"
            }
          />
        </Grid>
        <Grid xs={12} lg={8}>
          <TextField
            fullWidth
            label={"Email"}
            variant="standard"
            {...register("email", {
              required: { value: true, message: "請輸入Email" },
              pattern: { value: /^\S+@\S+$/i, message: "請輸入正確格式" },
            })}
            error={Boolean(errors.email)}
            helperText={
              errors.email
                ? errors.email.message +
                  "\n稍後發送報名完成之郵件，請輸入正確且完整"
                : "稍後發送報名完成之郵件，請輸入正確且完整"
            }
          />
        </Grid>
        <Grid xs={12} lg={12}>
          <TextField
            fullWidth
            label={"介紹人or園所"}
            variant="standard"
            {...register("introducer")}
            helperText="ex. 「皮蛋老師」或「何嘉仁xx分校」"
          />
        </Grid>
        {/* <Grid lg={4} /> */}
        <Grid xs={5} lg={5}>
          <FormControl variant="standard" sx={{ minWidth: 160, maxWidth: 600 }}>
            <InputLabel>報名人數</InputLabel>
            <Select
              value={signupSelected}
              onChange={(e) => setSignupSelected(Number(e.target.value))}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={-1}>其他</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {signupSelected === -1 && (
          <Grid xs={5} lg={5} xsOffset={2}>
            <TextField
              fullWidth
              label={"自訂報名人數"}
              variant="standard"
              type="number"
              {...register("signupNumbers", {
                required: { value: true, message: "請輸入自訂報名人數" },
                valueAsNumber: true,
              })}
              error={Boolean(errors.signupNumbers)}
              helperText={errors.signupNumbers?.message}
            />
          </Grid>
        )}
        {/* {signupLimit && signupCount && (
          <Grid xs={12} lg={12}>
            <Typography>剩餘名額：{signupLimit - signupCount}</Typography>
          </Grid>
        )} */}
        <Grid xs={4} xsOffset={4} lg={2} lgOffset={10}>
          <Button type="submit" variant="contained">
            送出
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
