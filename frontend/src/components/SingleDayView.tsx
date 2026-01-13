import { Box, Typography} from "@mui/material";
import { GraphFields } from "../types/types";
import { Graph } from "./Graph";

export const SingleDayView = () => {
  return (
    <Box sx={{ width: "100%", overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 2}}>
      {GraphFields.map((field) => (
        <Graph field={field} />
      ))}
    </Box>
  );
};

