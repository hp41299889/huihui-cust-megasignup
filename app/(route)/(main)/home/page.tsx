import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import Image from "next/image";

const Page = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} paddingTop={"2rem"}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnGap={4}
      >
        <Grid lg>
          <Image src={"/image/flow.jpg"} alt="flow" width={450} height={700} />
        </Grid>
        <Grid lg>
          <Image
            src={"/image/introduce.jpg"}
            alt="introduce"
            width={450}
            height={700}
          />
        </Grid>
        <Grid lg>
          <Image
            src={"/image/welcome.jpg"}
            alt="welcome"
            width={450}
            height={700}
          />
        </Grid>
        <Grid lg>
          <Image
            src={"/image/precautions.jpg"}
            alt="precautions"
            width={450}
            height={700}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
