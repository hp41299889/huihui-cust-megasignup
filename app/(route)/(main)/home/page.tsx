import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import { Image } from "antd";

const Page = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} paddingTop={"2rem"}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnGap={4}
        rowGap={4}
      >
        <Grid xs={12} lg>
          <Image src={"/image/flow.png"} alt="flow" width={400} height={650} />
        </Grid>
        <Grid xs={12} lg>
          <Image
            src={"/image/introduce.png"}
            alt="introduce"
            width={400}
            height={650}
          />
        </Grid>
        <Grid xs={12} lg>
          <Image
            src={"/image/welcome.png"}
            alt="welcome"
            width={400}
            height={650}
          />
        </Grid>
        <Grid xs={12} lg>
          <Image
            src={"/image/precautions.png"}
            alt="precautions"
            width={400}
            height={650}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
