import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import NewsSection from "./NewsSection";

const NEWS_TEST_DATA = [
  {
    header: "HO IS UNBEATABLE",
    date: new Date(2025, 0, 16),
  },
  {
    header: "RUA BIEN LOSS TO HO AGAIN",
    date: new Date(2025, 0, 15),
  },
  {
    header: "HO BEATS RUA BIEN AS ALWAYS",
    date: new Date(2025, 0, 14),
  },
];

const NewsCard = ({ sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          News
        </Typography>
        {NEWS_TEST_DATA.map((news, index) => (
          <NewsSection key={index} header={news.header} date={news.date} />
        ))}
      </CardContent>
    </Card>
  );
};
export default NewsCard;
NewsCard.propTypes = {
  sx: PropTypes.object,
};
