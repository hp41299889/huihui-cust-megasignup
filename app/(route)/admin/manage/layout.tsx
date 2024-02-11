import { Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box height={"100vh"}>
      <Box
        position="static"
        sx={{ backgroundColor: "rgba(214, 219, 220, 0.8)" }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography>後台管理</Typography>
          <Link href={"/home"}>
            <Button>回到首頁</Button>
          </Link>
        </Toolbar>
      </Box>
      <Box height={"auto"}>{children}</Box>
    </Box>
  );
};

export default Layout;
