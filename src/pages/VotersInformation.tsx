import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BarangaySelect from "../components/BarangaySelect";
import DistrictSelect from "../components/DistrictSelect";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectVotersInfo } from "../redux/profiles/selectors";
import { actions } from "../redux/profiles/slice";
import { VoterCheckType } from "../redux/profiles/types";

export default function VotersInformation() {
  const dispatch = useAppDispatch();
  const votersInfo = useAppSelector(selectVotersInfo);
  const personalInfoOutsideDvo = useAppSelector(
    (state) => state.profiles.personalInfo.outsideDvo
  );

  const disabledAccordingByAddress = React.useMemo(() => {
    if (personalInfoOutsideDvo && votersInfo.isRegistered) {
      return true;
    } else if (personalInfoOutsideDvo && votersInfo.votingOutsideDvo) {
      return false;
    } else if (!personalInfoOutsideDvo && votersInfo.isRegistered) {
      return false;
    } else {
      return true;
    }
  }, [
    personalInfoOutsideDvo,
    votersInfo.isRegistered,
    votersInfo.votingOutsideDvo,
  ]);

  const handleVoteChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: VoterCheckType) => {
      dispatch(
        actions.setVoterInfoChecked({
          checked: e.target.checked,
          type,
        })
      );
    },
    [dispatch]
  );

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(
        actions.setVotersInformation({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(
        actions.setVotersInformation({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Voters Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            sx={{ mt: 3 }}
            control={
              <Checkbox
                color="primary"
                name="isRegistered"
                checked={votersInfo.isRegistered}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => handleVoteChecked(e, "forVoter")}
              />
            }
            label="Registered voter (Davao)"
          />
          <Typography variant="body2" fontStyle="italic" color="grey">
            *Skip if your not a registered voter
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            sx={{ mt: 3 }}
            control={
              <Checkbox
                color="primary"
                name="votingOutsideDvo"
                checked={votersInfo.votingOutsideDvo}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => handleVoteChecked(e, "outSideVoter")}
              />
            }
            label="Registered voter (Outside Davao)"
          />
          <Typography variant="body2" fontStyle="italic" color="grey">
            *Skip if your not a registered voter
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            disabled={
              (!votersInfo.isRegistered && !votersInfo.votingOutsideDvo) ||
              disabledAccordingByAddress
            }
            sx={{ mt: 3 }}
            control={
              <Checkbox
                color="primary"
                name="sameAddress"
                checked={votersInfo.sameAddress}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => handleVoteChecked(e, "sameDetails")}
              />
            }
            label="Details is same with present info"
          />
          <Typography variant="body2" fontStyle="italic" color="grey">
            *Check if your voter's info is the same as your personal info
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!votersInfo.isRegistered && !votersInfo.votingOutsideDvo}
            id="votingPrecinctId"
            name="votingPrecinctId"
            label="Precinct ID (Optional)"
            value={votersInfo.votingPrecinctId || ""}
            fullWidth
            autoComplete="precinct-id"
            variant="standard"
            onChange={onChangeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DistrictSelect
            forVoter
            onSelect={onSelectChange}
            outsideDavao={votersInfo.votingOutsideDvo}
            disabled={!votersInfo.isRegistered && !votersInfo.votingOutsideDvo}
            selectedValue={
              votersInfo.votingDistrict ? votersInfo.votingDistrict : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect
            forVoter
            onSelect={onSelectChange}
            disabled={!votersInfo.isRegistered && !votersInfo.votingOutsideDvo}
            districtValue={votersInfo.votingDistrict || "poblacion"}
            selectedValue={
              votersInfo.votingBarangay ? votersInfo.votingBarangay : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={
              (!votersInfo.isRegistered && !votersInfo.votingOutsideDvo) ||
              votersInfo.sameAddress
            }
            id="votingCity"
            name="votingCity"
            label="City/Municipality"
            fullWidth
            value={votersInfo.votingCity || ""}
            autoComplete="personal address-city"
            variant="standard"
            onChange={onChangeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="votingRegion"
            disabled={
              (!votersInfo.isRegistered && !votersInfo.votingOutsideDvo) ||
              votersInfo.sameAddress
            }
            name="votingRegion"
            label="Province/Region"
            fullWidth
            value={votersInfo.votingRegion || ""}
            autoComplete="personal address-region"
            variant="standard"
            onChange={onChangeText}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
