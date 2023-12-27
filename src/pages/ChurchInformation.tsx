import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LeadershipLevel } from "../types/information";
import NetworkHeadsSelect from "../components/NetworkHeadsSelect";
import { useProfile } from "../hooks/useProfile";

export default function ChurchInformation() {
  const { churchInfo, setChurchInfo } = useProfile();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Church Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <NetworkHeadsSelect
            onSelect={(e) => {
              setChurchInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
            selectedValue={churchInfo.networkHead}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ ml: -2 }} id="leadership-level-select-label">
              Leadership Level
            </InputLabel>
            <Select
              required
              labelId="leadership-level-select-label"
              id="leadershipLevel"
              name="leadershipLevel"
              label="Leadership Level"
              value={churchInfo.leadershipLevel}
              onChange={(e) => {
                setChurchInfo((prevProps) => ({
                  ...prevProps,
                  [e.target.name]: e.target.value,
                }));
              }}
              defaultValue={LeadershipLevel.TwoEightEight}
              variant="standard"
            >
              <MenuItem value={LeadershipLevel.SeniorPastor}>
                Senior Pastor
              </MenuItem>
              <MenuItem value={LeadershipLevel.NetworkHead}>
                Network Head
              </MenuItem>
              <MenuItem value={LeadershipLevel.TwoEightEight}>288</MenuItem>
              <MenuItem value={LeadershipLevel.ThreeFourFiveSix}>3456</MenuItem>
              <MenuItem value={LeadershipLevel.TwentyK}>20K</MenuItem>
              <MenuItem value={LeadershipLevel.Multitudes}>Multitudes</MenuItem>
              <MenuItem value={LeadershipLevel.Visitors}>
                Visitors / House Churches
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Divine Appointment Date"
            views={["month", "year"]}
            name="divineAppointmentDate"
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder: "Divide Appointment Date",
              },
            }}
            value={churchInfo.divineAppointmentDate}
            onChange={(e) => {
              setChurchInfo((prevProps) => ({
                ...prevProps,
                divineAppointmentDate: e,
              }));
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
