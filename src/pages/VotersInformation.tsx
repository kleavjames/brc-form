import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BarangaySelect from "../components/BarangaySelect";
import DistrictSelect from "../components/DistrictSelect";
import { useProfile } from "../hooks/useProfile";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { barangays } from "../constants/barangay";
import { Barangays } from "../types/information";

export default function VotersInformation() {
  const { votersInfo, setVotersInfo } = useProfile();

  const handleVoteChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setVotersInfo({
        votingPrecinctId: null,
        votingBarangay: null,
        votingDistrict: null,
        votingDistrictNumber: null,
        votingCity: null,
        votingRegion: null,
        isRegistered: e.target.checked,
      });
      return;
    }

    setVotersInfo((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSelectDistrict = useCallback(
    (e: SelectChangeEvent<string>) => {
      setVotersInfo((prevProps) => ({
        ...prevProps,
        [e.target.name]: e.target.value,
      }));
    },
    [setVotersInfo]
  );

  const onSelectBarangay = useCallback(
    (e: SelectChangeEvent<string>) => {
      const districtNum = (barangays as unknown as Barangays)[
        votersInfo.votingDistrict!
      ][0].district;
      setVotersInfo((prevProps) => ({
        ...prevProps,
        votingDistrictNumber: districtNum,
        [e.target.name]: e.target.value,
      }));
    },
    [votersInfo.votingDistrict, setVotersInfo]
  );

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
            id="votingPrecinctId"
            name="votingPrecinctId"
            label="Precinct ID"
            value={votersInfo.votingPrecinctId || ""}
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
            forVoter
            onSelect={onSelectDistrict}
            disabled={!votersInfo.isRegistered}
            selectedValue={
              votersInfo.votingDistrict ? votersInfo.votingDistrict : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect
            forVoter
            onSelect={onSelectBarangay}
            disabled={!votersInfo.isRegistered}
            districtValue={votersInfo.votingDistrict || "poblacion"}
            selectedValue={
              votersInfo.votingBarangay ? votersInfo.votingBarangay : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={!votersInfo.isRegistered}
            id="votingCity"
            name="votingCity"
            label="City/Municipality"
            fullWidth
            value={votersInfo.votingCity || ""}
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
            id="votingRegion"
            disabled={!votersInfo.isRegistered}
            name="votingRegion"
            label="Province/Region"
            fullWidth
            value={votersInfo.votingRegion || ""}
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
