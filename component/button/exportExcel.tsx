import { Button } from "@mui/material";
import { Signup } from "@prisma/client";
import { utils, writeFileXLSX } from "xlsx";

interface Props {
  signups: Signup[];
}

const ExportExcelButton = (props: Props) => {
  const { signups } = props;

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
    <Button color="success" variant="contained" onClick={exportExcel}>
      匯出excel
    </Button>
  );
};

export default ExportExcelButton;
