import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BarangaySelect from "../components/BarangaySelect";
import DistrictSelect from "../components/DistrictSelect";
import { useProfile } from "../hooks/useProfile";

export default function VotersInformation() {
  const { votersInfo, setVotersInfo } = useProfile();

  const handleVoteChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setVotersInfo({
        precinctId: null,
        barangay: null,
        district: null,
        city: null,
        region: null,
        isRegistered: e.target.checked,
      });
      return;
    }
  
    setVotersInfo((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.checked,
    }));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Voters Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ mt: 3 }}
            control={
              <Checkbox
                color="primary"
                name="isRegistered"
                checked={votersInfo.isRegistered}
                inputProps={{ "aria-label": "controlled" }}
                onChange={handleVoteChecked}
              />
            }
            label="Registered voter"
          />
          <Typography variant="body2" fontStyle="italic" color="grey">
            *Skip if your not a registered voter
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!votersInfo.isRegistered}
            id="precinctId"
            name="precinctId"
            label="Precinct ID"
            value={votersInfo.precinctId || ""}
            fullWidth
            autoComplete="precinct-id"
            variant="standard"
            onChange={(e) => {
              setVotersInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DistrictSelect
            onSelect={(e) => {
              setVotersInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
            disabled={!votersInfo.isRegistered}
            selectedValue={votersInfo.district ? votersInfo.district : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect
            onSelect={(e) => {
              setVotersInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
            disabled={!votersInfo.isRegistered}
            districtValue={votersInfo.district || "poblacion"}
            selectedValue={votersInfo.barangay ? votersInfo.barangay : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={!votersInfo.isRegistered}
            id="city"
            name="city"
            label="City/Municipality"
            fullWidth
            value={votersInfo.city || ""}
            autoComplete="personal address-city"
            variant="standard"
            onChange={(e) => {
              setVotersInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="region"
            disabled={!votersInfo.isRegistered}
            name="region"
            label="Province/Region"
            fullWidth
            value={votersInfo.region || ""}
            autoComplete="personal address-region"
            variant="standard"
            onChange={(e) => {
              setVotersInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
