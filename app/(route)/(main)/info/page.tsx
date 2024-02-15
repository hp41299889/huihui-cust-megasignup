"use client";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Image } from "antd";
import { useRef } from "react";

const Page = () => {
  const accountRef = useRef<HTMLButtonElement>(null);
  const onClickAccount = () => {
    const accountText = accountRef.current?.innerText;
    if (navigator.clipboard && window.isSecureContext) {
    } else {
      const copyText = document.createElement("textarea");
      copyText.value = accountText as string;
      copyText.style.display = "none";
      document.body.appendChild(copyText);
      copyText.select();
      document.execCommand("copy");
      document.body.removeChild(copyText);
    }
  };

  return (
    <Box padding={"1rem"} margin={0}>
      <Grid container>
        <Grid lg={6}>
          <Typography variant="h5">客服Line帳號：</Typography>
          <Image src={"/image/line.jpg"} alt="line" width={400} height={400} />
        </Grid>
        <Grid lg={6}>
          <Typography variant="h5">匯款帳號：</Typography>
          <Image src={"/image/bank.png"} alt="bank" width={600} height={400} />
          <Typography color={"red"}>
            匯款時請備註報名資料的姓名or回傳帳號末5碼至Line客服，以利查帳作業。
          </Typography>
          <Typography variant="h6">帳號：</Typography>
          <Typography>007-09-08201-6</Typography>
        </Grid>
      </Grid>
      {/* <Button ref={accountRef} type="link" onClick={onClickAccount}>
        007-09-08201-6
      </Button> */}
    </Box>
  );
};

export default Page;
