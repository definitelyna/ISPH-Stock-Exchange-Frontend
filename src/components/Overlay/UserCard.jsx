import { Typography, Box, Avatar, Button } from "@mui/material";
import useAuth from "../../firebase/AuthService";
import { useNavigate } from "react-router-dom";
const LoadingCard = () => {
  return (
    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
      Loading...
    </Typography>
  );
};

const LoggedInCard = () => {
  const { user } = useAuth();
  return (
    <>
      <Avatar
        sizes="small"
        alt="User Photo"
        src={user?.photoURL}
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: "auto" }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          {user?.displayName}
        </Typography>
      </Box>
    </>
  );
};

const LoggedOutCard = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signIn");
  };
  return (
    <>
      <Button sx={{ mr: "auto", p: 1 }} onClick={handleLoginClick}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          Log in
        </Typography>
      </Button>{" "}
    </>
  );
};

export default function UserCard() {
  const { user, loading } = useAuth();
  return user ? (
    <LoggedInCard/>
  ) : (
    <LoggedOutCard />
  );
}
