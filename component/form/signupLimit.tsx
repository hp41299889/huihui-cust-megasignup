import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

import { useFetchData } from "@/util/client/hook/useFetchData";
import { getSignupLimit } from "@/util/client/api";
import { patchSignupLimit } from "@/util/client/api";

const SignupLimitForm = () => {
  const [signupLimitField, mutateSignupLimitField] = useFetchData(
    "signupLimit",
    getSignupLimit
  );
  const signupLimit = signupLimitField?.value;
  const { register, setValue, handleSubmit } =
    useForm<Prisma.SettingUpdateInput>();

  const onSubmit = async (payload: Prisma.SettingUpdateInput) => {
    try {
      const p: Prisma.SettingUpdateInput = {
        value: payload.value,
      };
      const res = await patchSignupLimit(p);
      //TODO feedback
      mutateSignupLimitField();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (signupLimit) {
      setValue("value", signupLimit);
    }
  }, [signupLimit]);

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("value")}
        label="報名人數上限"
        variant="standard"
      />
      <Button type="submit" variant="contained">
        儲存
      </Button>
    </Box>
  );
};

export default SignupLimitForm;
