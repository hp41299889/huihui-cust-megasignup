"use client";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { PostLogin } from "@/app/api/auth/login/route";
import { postLogin } from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";

const LoginForm = () => {
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostLogin>();
  const router = useRouter();

  const onSubmit = async (payload: PostLogin) => {
    try {
      const res = await postLogin(payload);
      if (res.data.status.type === "success") {
        router.push("/admin/manage");
      }
    } catch (error) {
      setAlertType("error");
      alert("登入失敗");
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <Grid container rowSpacing={"1rem"}>
        <Grid lg={12}>
          <TextField
            fullWidth
            label="帳號"
            variant="standard"
            {...register("username", {
              required: { value: true, message: "請輸入帳號" },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
        </Grid>
        <Grid lg={12}>
          <TextField
            fullWidth
            label="密碼"
            variant="standard"
            {...register("password", {
              required: { value: true, message: "請輸入密碼" },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid lg={2} lgOffset={10}>
          <Button type="submit" variant="contained">
            登入
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
