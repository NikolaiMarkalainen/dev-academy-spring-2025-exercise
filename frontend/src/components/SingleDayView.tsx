import { Backdrop, Box, IconButton, Modal } from "@mui/material";
import { GraphFields } from "../types/types";
import { Graph } from "./Graph";
import { useNavigate } from "react-router-dom";
import { useSinglePageView } from "../hooks/useSinglePageView";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
export const SingleDayView = () => {
  const navigate = useNavigate();
  const { date } = useParams();

  const { dayData } = useSinglePageView(date);

  if (!date) return <>Unable to find data</>;

  return (
    <Modal
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      open
      onClose={() => void navigate(-1)}
    >
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: {
            md: "1fr 1fr",
            xs: "1fr",
          },
          gridTemplateRows: "auto auto",
          gap: 3,
          overflow: "auto",
          backgroundColor: "#161618",
          maxWidth: {
            xs: "95%",
            md: "90%",
          },
          mt: "10vh",
          maxHeight: {
            xs: "90vh",
            md: "80vh",
          },
          mx: "auto",
          border: "1px solid rgba(172, 210, 104, 0.4)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => void navigate(-1)}
        >
          <CloseIcon />
        </IconButton>
        {GraphFields.map((field, index) => (
          <Graph key={index} field={field} data={dayData} />
        ))}
      </Box>
    </Modal>
  );
};
