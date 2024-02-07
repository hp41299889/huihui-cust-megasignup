"use client";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import { getCheckinSignup } from "@/util/client/api";

const Checkin = () => {
  // TODO feedback and watch isVerify
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>();

  const onSubmit = async (payload: { phone: string }) => {
    const { phone } = payload;
    try {
      const res = await getCheckinSignup(phone);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={"1rem"}>
        <Grid lg={12}>
          <TextField
            fullWidth
            label="電話號碼"
            variant="standard"
            {...register("phone", {
              required: { value: true, message: "請輸入電話號碼" },
            })}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid lg={2} lgOffset={10}>
          <Button type="submit" variant="contained">
            報到
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkin;
