import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";

const buttonStyle: SxProps = { fontSize: 20 };

const Navbar = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(214, 219, 220, 0.8)" }}
      >
        <Typography
          color={"black"}
          variant="h2"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          2024童樂星遊記～報名網頁
        </Typography>
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <Link href={"/home"}>
              <Button sx={buttonStyle}>活動首頁</Button>
            </Link>
            <Link href={"/signup"}>
              <Button sx={buttonStyle}>前往報名</Button>
            </Link>
            <Link href={"/info"}>
              <Button sx={buttonStyle}>相關資訊</Button>
            </Link>
          </Box>
          <Link href={"/admin/login"}>
            <Button sx={buttonStyle}>登入</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
