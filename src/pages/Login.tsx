import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BRCLogo from "../assets/BRC_logo.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        mx: 3,
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: 3, width: { md: 500, sm: 500, xs: "100%" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={BRCLogo} width={200} />
        </Box>
        <Typography variant="h5" fontWeight={500} sx={{ my: 4 }}>
          Login to BRC Profiling
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            id="userName"
            name="userName"
            label="Username"
            fullWidth
            autoComplete="user-name"
            variant="standard"
          />
          <TextField
            required
            id="userName"
            name="password"
            type="password"
            label="Password"
            fullWidth
            autoComplete="user-name"
            variant="standard"
          />
        </Stack>
        <Button
          variant="contained"
          size="large"
          disableElevation
          fullWidth
          sx={{ mt: 5, mb: 1 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
