import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

import Navbar from "@/component/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box height={"100vh"} width={"100vw"} sx={{ backgroundColor: "white" }}>
      <Navbar />
      <Box height={"100%"}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
