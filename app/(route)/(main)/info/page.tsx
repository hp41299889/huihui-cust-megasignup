"use client";
import { Box, Typography } from "@mui/material";
import { Button } from "antd";
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
    <Box padding={1} margin={0}>
      <Typography variant="h6">匯款帳號：</Typography>
      <Typography>泡泡龍創意活動工作室－兆豐國際商業銀行 國外部017</Typography>
      <Typography>007-09-08201-6</Typography>
      {/* <Button ref={accountRef} type="link" onClick={onClickAccount}>
        007-09-08201-6
      </Button> */}
    </Box>
  );
};

export default Page;
