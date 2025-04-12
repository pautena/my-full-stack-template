import { Grid2, MenuItem, type PaletteMode, Typography } from "@mui/material";
import { Select } from "@pautena/react-design-system";
import { useColorMode } from "../../theme";

const Appearance = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography variant="h4">Appearance</Typography>
      </Grid2>
      <Grid2 size={4}>
        <Select
          label="Theme"
          fullWidth
          value={colorMode}
          onChange={(e) => setColorMode(e.target.value as PaletteMode)}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </Grid2>
    </Grid2>
  );
};
export default Appearance;
