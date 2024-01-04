import { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import NetworkHeadsSelect from "../components/NetworkHeadsSelect";
import { LeadershipLevel } from "../redux/profiles/enums";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectChurchInfo } from "../redux/profiles/selectors";
import { actions } from "../redux/profiles/slice";

export default function ChurchInformation() {
  const dispatch = useAppDispatch();
  const churchInfo = useAppSelector(selectChurchInfo);

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(
        actions.setChurchInformation({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const onSelectDADate = useCallback(
    (value: Date | null) => {
      const dt = new Date(value!);
      const year = dt.getUTCFullYear();
      const month = dt.getUTCMonth() + 1; // Date provides month index; not month number
      const day = dt.getUTCDate();

      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1000) {
        dispatch(
          actions.setChurchInformation({
            name: "divineAppointmentDate",
            value: dt.toISOString() || null,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Church Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <NetworkHeadsSelect
            onSelect={onSelectChange}
            disabled={churchInfo.leadershipLevel === LeadershipLevel.Visitors}
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
              onChange={onSelectChange}
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
            disabled={churchInfo.leadershipLevel === LeadershipLevel.Visitors}
            name="divineAppointmentDate"
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder: "Divide Appointment Date",
              },
            }}
            value={
              churchInfo.divineAppointmentDate
                ? new Date(churchInfo.divineAppointmentDate)
                : null
            }
            onChange={onSelectDADate}
          />
        </Grid>
      </Grid>
    </>
  );
}
