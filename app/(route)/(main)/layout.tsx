import { Box } from "@mui/material";
import { ReactNode } from "react";

import Navbar from "@/component/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box height={"100vh"}>
      <Navbar />
      <Box height={"auto"}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
