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
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { postSignup } from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";

const SignupForm = () => {
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
      alert("got error");
    }
  };

  useEffect(() => {
    if (signupSelected !== -1) {
      setValue("signupNumbers", Number(signupSelected));
    } else {
      setValue("signupNumbers", 5);
    }
  }, [signupSelected]);

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
        <Grid xs={12} lg={8}>
          <TextField
            fullWidth
            label={"介紹人or園所"}
            variant="standard"
            {...register("introducer")}
            helperText="ex. 「皮蛋老師」或「何嘉仁xx分校」"
          />
        </Grid>
        {/* <Grid xs={0} lg={4} /> */}
        <Grid xs={5} lg={4}>
          <FormControl variant="standard" sx={{ minWidth: 160 }}>
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
          <Grid xs={5} lg={4} xsOffset={2}>
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
        <Grid xs={2} lg={2} xsOffset={4} lgOffset={10}>
          <Button type="submit" variant="contained">
            送出
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
