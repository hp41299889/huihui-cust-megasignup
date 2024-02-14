import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Signup } from "@prisma/client";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "姓名", width: 100 },
  { field: "phone", headerName: "電話號碼", width: 140 },
  {
    field: "signupNumbers",
    headerName: "報名人數",
    type: "number",
    width: 140,
  },
  { field: "email", headerName: "Email", width: 250 },
  { field: "introducer", headerName: "介紹人or園所", width: 200 },
  // { field: "isVerify", headerName: "驗證", type: "boolean", width: 120 },
  { field: "isCheckin", headerName: "報到", type: "boolean", width: 120 },
];

interface Props {
  signups: Signup[];
}

const SignupTable = (props: Props) => {
  const { signups } = props;

  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={signups}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
    </Box>
  );
};

export default SignupTable;
