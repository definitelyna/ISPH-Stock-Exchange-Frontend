import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import moment from "moment";

const NewsSection = ({ sx, header, date }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "row",
        borderTop: "1px solid #E0E0E0",
        justifyContent: "space-between",
        p: 1,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{header}</Typography>
      <Typography sx={{color: "gray"}}>{moment(date).format("D/MM/YY")}</Typography>
    </Box>
  );
};

export default NewsSection;

NewsSection.propTypes = {
  sx: PropTypes.object,
  header: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
