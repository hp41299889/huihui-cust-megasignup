"use client";

import { Box, Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Signup } from "@prisma/client";

import AlertFeedback from "../feedback/alert";
import { useAlert } from "@/util/client/hook/useAlert";
import { patchVerifySignup } from "@/util/client/api";

interface Props {
  signup: Signup;
  setVerifyOpen: (o: boolean) => void;
}

const VerifyForm = (props: Props) => {
  const { signup, setVerifyOpen } = props;
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();
  const { name, phone, signupNumbers } = signup;

  const isCheckin = signup.isCheckin;

  const onCancel = () => setVerifyOpen(false);

  const onSubmit = async () => {
    try {
      const res = await patchVerifySignup(signup.id);
      if (res.data.status.type === "success") {
        setAlertType("success");
        alert("報到成功");
        setTimeout(onCancel, 3000);
      }
    } catch (error) {
      setAlertType("error");
      alert("gor error");
    }
  };

  return (
    <Box component={"form"}>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <Box width={300}>
        {isCheckin ? (
          <>
            <Typography> 此資料已完成報到，請重新輸入</Typography>
            <Grid container>
              <Grid lgOffset={10}>
                <Button variant="contained" onClick={onCancel}>
                  確認
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography>姓名： {name}</Typography>
            <Typography>電話號碼： {phone}</Typography>
            <Typography>報名人數： {signupNumbers}</Typography>
            <Box paddingTop={"1.5rem"}>
              <Grid container>
                <Grid lg lgOffset={1.5}>
                  <Button variant="contained" onClick={onCancel}>
                    取消
                  </Button>
                </Grid>
                <Grid lg>
                  <Button variant="contained" onClick={onSubmit}>
                    確認
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyForm;
