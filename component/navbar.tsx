import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(214, 219, 220, 0.8)" }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography>logo</Typography>
          <Link href={"/home"}>
            <Button>Home</Button>
          </Link>
          <Link href={"/signup"}>
            <Button>signup</Button>
          </Link>
          <Link href={"/info"}>
            <Button>info</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
