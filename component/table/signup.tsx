import {
  Box,
  InputLabel,
  TextField,
  Button,
  Unstable_Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Signup } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ExportExcelButton from "../button/exportExcel";
import { deleteSignups } from "@/util/client/api";
import { useAlert } from "@/util/client/hook/useAlert";
import AlertFeedback from "../feedback/alert";
import { KeyedMutator } from "swr";

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
  mutateSignups: KeyedMutator<Signup[]>;
}

const SignupTable = (props: Props) => {
  const { signups, mutateSignups } = props;
  const [filterSignups, setFilterSignups] = useState<Signup[]>(signups);
  const [query, setQuery] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [doubleCheck, setDoubleCheck] = useState<boolean>(false);
  const [alertOpen, alertMsg, alertType, alert, setAlertType, onCloseAlert] =
    useAlert();

  const onSubmit = async () => {
    try {
      const res = await deleteSignups(selectedRows as number[]);
      if (res.data.status.type === "success") {
        setAlertType("success");
        alert("刪除完成");
        await mutateSignups();
        onCloseModal();
      }
    } catch (error) {
      setAlertType("error");
      alert("got error");
    }
  };

  const onClickCheckin = () => {
    const filtered = signups.filter((r) => r.isCheckin);
    setFilterSignups(filtered);
  };

  const onClickReset = () => {
    setFilterSignups(signups);
  };

  const onClickFilter = () => {
    const filtered = signups.filter((r) =>
      Object.values(r).some(
        (v) =>
          v &&
          v.toString().toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    );
    setFilterSignups(filtered);
  };

  const onChangeSelectedRows = (rows: GridRowSelectionModel, _: any) => {
    setSelectedRows(rows);
  };

  const onChangeDoubleCheck = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDoubleCheck(e.target.checked);

  const onClickDelete = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setDoubleCheck(false);
  };

  useEffect(() => {
    setFilterSignups(signups);
  }, [signups]);

  return (
    <Box>
      <AlertFeedback
        open={alertOpen}
        message={alertMsg}
        type={alertType}
        onClose={onCloseAlert}
      />
      <Dialog open={open} onClose={onCloseModal}>
        <DialogTitle>刪除已選擇資料</DialogTitle>
        <DialogContent>
          <Typography color="red">
            警告！此動作無法恢復，請謹慎操作！
          </Typography>
          <Typography color="red">建議先匯出資料避免資料遺失。</Typography>
          <FormControlLabel
            control={
              <Checkbox checked={doubleCheck} onChange={onChangeDoubleCheck} />
            }
            label="我明白了！"
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ExportExcelButton signups={signups} />
          <Box>
            <Button variant="contained" onClick={onCloseModal}>
              取消
            </Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={!doubleCheck}
            >
              確認
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        <Grid xs={6} lg={1}>
          <Button color="info" onClick={onClickCheckin} variant="contained">
            篩選已報到
          </Button>
        </Grid>
        <Grid xs={6} lg={1}>
          <Button color="inherit" onClick={onClickReset} variant="contained">
            重置篩選
          </Button>
        </Grid>
        <Grid xs={6} lg={2}>
          <InputLabel>搜尋</InputLabel>
          <TextField
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid xs={1} lg={1} xsOffset={1} lgOffset={0}>
          <Button variant="contained" onClick={onClickFilter}>
            搜尋
          </Button>
        </Grid>
        {selectedRows.length > 0 && (
          <Grid xs={12} lg={1}>
            <Button color="error" variant="contained" onClick={onClickDelete}>
              刪除已選擇
            </Button>
          </Grid>
        )}
        <Grid lg={12}>
          <DataGrid
            columns={columns}
            rows={filterSignups}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            onRowSelectionModelChange={onChangeSelectedRows}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupTable;
