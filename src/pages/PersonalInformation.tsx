import { Fragment, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DistrictSelect from "../components/DistrictSelect";
import BarangaySelect from "../components/BarangaySelect";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectPersonalInfo } from "../redux/profiles/selectors";
import { actions } from "../redux/profiles/slice";
import { Gender, Status } from "../redux/profiles/enums";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PersonalInformation() {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(selectPersonalInfo);

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(
        actions.setPersonalInformation({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setAddressOutsideDavao(e.target.checked));
    },
    [dispatch]
  );

  const onSelectBdate = useCallback(
    (value: Date | null) => {
      const dt = new Date(value!);
      const year = dt.getUTCFullYear();
      const month = dt.getUTCMonth() + 1; // Date provides month index; not month number
      const day = dt.getUTCDate();

      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1000) {
        dispatch(
          actions.setPersonalInformation({
            name: "birthdate",
            value: dt.toISOString() || null,
          })
        );
      }
    },
    [dispatch]
  );

  const onChangePersonalText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(
        actions.setPersonalInformation({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={personalInfo.firstName}
            onChange={onChangePersonalText}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="middleName"
            name="middleName"
            label="Middle name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={personalInfo.middleName}
            onChange={onChangePersonalText}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={personalInfo.lastName}
            onChange={onChangePersonalText}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Birthdate"
            name="birthdate"
            onChange={onSelectBdate}
            value={
              personalInfo.birthdate ? new Date(personalInfo.birthdate) : null
            }
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder: "Birthdate",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ ml: -2 }} id="gender-select-label">
              Gender
            </InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender"
              name="gender"
              label="Gender"
              defaultValue="M"
              value={personalInfo.gender}
              onChange={onSelectChange}
              variant="standard"
            >
              <MenuItem value={Gender.Male}>Male</MenuItem>
              <MenuItem value={Gender.Female}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ ml: -2 }} id="status-select-label">
              Status
            </InputLabel>
            <Select
              labelId="status-select-label"
              id="status"
              defaultValue={Status.Married}
              name="status"
              label="Status"
              value={personalInfo.status}
              onChange={onSelectChange}
              variant="standard"
            >
              <MenuItem value={Status.Married}>Married</MenuItem>
              <MenuItem value={Status.Single}>Single</MenuItem>
              <MenuItem value={Status.Divorced}>Divorced</MenuItem>
              <MenuItem value={Status.Widowed}>Widowed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ mt: 3 }}
            control={
              <Checkbox
                color="primary"
                name="outsideDvo"
                checked={personalInfo.outsideDvo}
                inputProps={{ "aria-label": "controlled" }}
                onChange={handleCheck}
              />
            }
            label="Currently residing outside davao"
          />
          <Typography variant="body2" fontStyle="italic" color="grey">
            *No need to input district and barangay if address is not in davao
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="personal address"
            variant="standard"
            value={personalInfo.address}
            onChange={onChangePersonalText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DistrictSelect
            onSelect={onSelectChange}
            outsideDavao={personalInfo.outsideDvo}
            selectedValue={personalInfo.district}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect
            onSelect={onSelectChange}
            districtValue={personalInfo.district}
            selectedValue={personalInfo.barangay}
          />
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
            value={personalInfo.city}
            onChange={onChangePersonalText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="region"
            name="region"
            label="Province/Region"
            fullWidth
            autoComplete="personal address-region"
            variant="standard"
            value={personalInfo.region}
            onChange={onChangePersonalText}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
