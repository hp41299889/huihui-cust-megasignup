"use client";
import { Box, Button } from "@mui/material";
import { utils, writeFileXLSX } from "xlsx";

import { getSignup } from "@/util/client/api";
import { useFetchData } from "@/util/client/hook/useFetchData";
import SignupTable from "@/component/table/signup";
import SettingForm from "@/component/form/setting";

const Page = () => {
  const [signups, mutateSignups] = useFetchData("signup", getSignup);

  const exportExcel = () => {
    const data = signups?.map((s) => ({
      ID: s.id,
      姓名: s.name,
      電話號碼: s.phone,
      Email: s.email,
      報名人數: s.signupNumbers,
      介紹人or園所: s.introducer,
      是否報到: s.isCheckin,
    }));
    if (data) {
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "報名紀錄");
      writeFileXLSX(wb, "報名紀錄.xlsx");
    }
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} paddingBlock={2}>
        <Box>search bar</Box>
        <Box display={"flex"} paddingInline={"2rem"}>
          <Button variant="contained" onClick={exportExcel}>
            匯出excel
          </Button>
          <SettingForm />
        </Box>
      </Box>
      {signups && <SignupTable signups={signups} />}
    </Box>
  );
};

export default Page;
