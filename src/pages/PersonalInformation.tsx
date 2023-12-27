import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Gender, Status } from "../types/information";
import DistrictSelect from "../components/DistrictSelect";
import BarangaySelect from "../components/BarangaySelect";
import { useProfile } from "../hooks/useProfile";

export default function PersonalInformation() {
  const { personalInfo, setPersonalInfo } = useProfile();

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
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
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
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
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
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Birthdate"
            name="birthdate"
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                birthdate: e,
              }));
            }}
            value={personalInfo.birthdate}
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
              onChange={(e) => {
                setPersonalInfo((prevProps) => ({
                  ...prevProps,
                  [e.target.name]: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setPersonalInfo((prevProps) => ({
                  ...prevProps,
                  [e.target.name]: e.target.value,
                }));
              }}
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
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="personal address"
            variant="standard"
            value={personalInfo.address}
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DistrictSelect
            onSelect={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
            selectedValue={personalInfo.district}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarangaySelect
            onSelect={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
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
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
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
            onChange={(e) => {
              setPersonalInfo((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
