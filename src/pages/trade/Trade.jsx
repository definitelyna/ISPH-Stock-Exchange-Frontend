import Overlay from "../../components/Overlay/Overlay";
import {Box, useTheme} from "@mui/material";
import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import useAuth from "../../firebase/AuthService";
import { styled } from "@mui/system";

const NonThemedBox = styled(Box)({
  all: "unset", // Reset all inherited styles
});

export default function Trade() {
  const [formData, setFormData] = useState({
    url: "",
    method: "GET",
    payload: "",
  });

  const [response, setResponse] = useState("");
  const { user } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get the current user's Firebase access token

      if (!user) {
        throw new Error("User is not authenticated.");
      }
      const token = await user.getIdToken();

      // Set up headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Fetch data
      const response = await fetch(formData.url, {
        method: formData.method,
        headers,
        body:
          formData.method === "POST"
            ? JSON.stringify(JSON.parse(formData.payload))
            : undefined,
      });

      // Parse and update the response
      const result = await response.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <Overlay>
      <NonThemedBox
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" align="center">
          API Request Form
        </Typography>
        <TextField
          label="API URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <FormControl>
          <InputLabel>Method</InputLabel>
          <Select
            name="method"
            value={formData.method}
            onChange={handleChange}
            required
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
          </Select>
        </FormControl>
        {formData.method === "POST" && (
          <TextField
            label="Payload (JSON)"
            name="payload"
            value={formData.payload}
            onChange={handleChange}
            variant="outlined"

            sx={{height: 100}}
            multiline
            rows={4}
            required
          />
        )}
        <Button variant="contained" type="submit">
          Send Request
        </Button>
        {response && (
          <Box mt={2}>
            <Typography variant="h6">Response:</Typography>
            <pre
              style={{
                background: "black",
                padding: "10px",
                borderRadius: "5px",
                overflowX: "auto",
                color: "white",
              }}
            >
              {response}
            </pre>
          </Box>
        )}
      </NonThemedBox>
    </Overlay>
  );
}
