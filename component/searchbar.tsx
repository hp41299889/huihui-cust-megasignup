import { Box, InputLabel, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <Box>
      <InputLabel>搜尋</InputLabel>
      <TextField fullWidth variant="standard" />
    </Box>
  );
};

export default SearchBar;
