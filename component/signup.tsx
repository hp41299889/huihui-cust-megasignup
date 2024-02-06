"use client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

const Signup = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Prisma.SignupCreateInput>();
  console.log(errors);

  const onSubmit = async (payload: Prisma.SignupCreateInput) => {
    console.log(payload);
    console.log(errors);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item lg={12}>
          <TextField
            {...register("name", {
              required: { value: true, message: "請輸入姓名" },
            })}
            fullWidth
            label={"姓名"}
            variant="standard"
            error={Boolean(errors.name)}
            // helperText={errors.name.}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            {...register("childName", { required: true })}
            fullWidth
            label={"幼童姓名"}
            variant="standard"
            error={Boolean(errors.childName)}
            helperText={errors.childName && "請輸入幼童姓名"}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            {...register("phone", { required: true })}
            fullWidth
            label={"手機"}
            variant="standard"
            FormHelperTextProps={{
              sx: { color: "red" },
            }}
            error={Boolean(errors.name)}
            helperText={
              errors.phone
                ? "請輸入手機\n該手機號碼為活動日報到之依據，請務必再次確認"
                : "該手機號碼為活動日報到之依據，請務必再次確認"
            }
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            fullWidth
            label={"Email"}
            variant="standard"
            helperText="稍後發送報名完成之郵件，請輸入正確且完整"
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            {...register("introducer")}
            fullWidth
            label={"介紹人or園所"}
            variant="standard"
            helperText="ex. 「皮蛋老師」或「何嘉仁xx分校」"
          />
        </Grid>
        <Grid item lg={12}>
          <FormControl variant="standard" sx={{ minWidth: 160 }}>
            <InputLabel>報名人數</InputLabel>
            <Controller
              name="signupNumbers"
              control={control}
              defaultValue={2}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Select {...field}>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={0}>其他</MenuItem>
                  </Select>
                );
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit">s</Button>
    </Box>
  );
};

export default Signup;
