import { Backdrop, Box, Modal} from "@mui/material";
import { GraphFields } from "../types/types";
import { Graph } from "./Graph";
import { useNavigate } from "react-router-dom";
import { useSinglePageView } from "../hooks/useSinglePageView";
import { useParams } from "react-router-dom";
export const SingleDayView = () => {

  const navigate = useNavigate();
  const { date } = useParams();
  if (!date) return <>Unable to find data</>;

  const {dayData} = useSinglePageView(date);

  return (
    <Modal
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 700
        }
      }}
      open
      onClose={() => navigate(-1)}> 
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          md: '1fr 1fr',
          xs: '1fr'
        },
        gridTemplateRows: 'auto auto',
        gap: 3,
        overflow: 'auto', 
        backgroundColor: '#161618',
        maxWidth:
        {
          xs: '95%',
          md: "80%"   
        },
        mt: '10vh',
        maxHeight: {
        xs: '90vh',
         md:'80vh',
        },
        mx: 'auto',
        border: '1px solid white'
      }}>
          {GraphFields.map((field, index) => (
            <Graph key={index} field={field} data={dayData} />
          ))}
        </Box>
    </Modal>
      );
      
};

