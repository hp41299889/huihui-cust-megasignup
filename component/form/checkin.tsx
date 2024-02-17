"use client";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Signup } from "@prisma/client";

import { getCheckinSignup } from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";

interface Props {
  setVerifyOpen: (o: boolean) => void;
  setSignup: (s: Signup) => void;
}

const CheckinForm = (props: Props) => {
  const { setVerifyOpen, setSignup } = props;
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ phone: string }>();

  const onSubmit = async (payload: { phone: string }) => {
    const { phone } = payload;
    try {
      const res = await getCheckinSignup(phone);
      if (res.data.status.type === "success") {
        const { data } = res.data.resbonse;
        if (!data) {
          setAlertType("error");
          alert("查詢失敗，查無此資料");
          reset();
        } else {
          setAlertType("success");
          alert("查詢成功，請再次確認訊息以完成報到");
          setSignup(data);
          setVerifyOpen(true);
          reset();
        }
      }
    } catch (error) {
      setAlertType("error");
      alert("gor error");
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

export default CheckinForm;
