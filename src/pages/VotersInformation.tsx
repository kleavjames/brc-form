import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BarangaySelect from '../components/BarangaySelect';
import DistrictSelect from '../components/DistrictSelect';

export default function VotersInformation() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Voters Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{mt: 3}}
            control={<Checkbox color="primary" name="registeredVoter" value="yes" />}
            label="Registered voter"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="precinctId"
            name="precinctId"
            label="Precinct ID"
            fullWidth
            autoComplete="precinct-id"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DistrictSelect />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City/Municipality"
            fullWidth
            autoComplete="personal address-city"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="province"
            name="province"
            label="Province/Region"
            fullWidth
            autoComplete="personal address-province"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}