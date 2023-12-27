import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ChurchInformation() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Church Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="networkHead"
            name="networkHead"
            label="Network Head"
            fullWidth
            autoComplete="network-head"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="leadershipLevel"
            name="leadershipLevel"
            label="Leadership Level"
            fullWidth
            autoComplete="leadership-level"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="daDate"
            name="daDate"
            label="Divine Appointment Date"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
