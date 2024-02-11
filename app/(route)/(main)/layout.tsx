import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

import Navbar from "@/component/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Paper>
      <Box height={"100vh"} sx={{ backgroundColor: "white" }}>
        <Navbar />
        <Box height={"100%"}>{children}</Box>
      </Box>
    </Paper>
  );
};

export default MainLayout;
