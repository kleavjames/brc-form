import { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DistrictSelect from "../DistrictSelect";
import BarangaySelect from "../BarangaySelect";
import Typography from "@mui/material/Typography";
import NetworkHeadsSelect from "../NetworkHeadsSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Gender, LeadershipLevel, Status } from "../../redux/profiles/enums";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectDefaultProfile,
  selectValidProfile,
} from "../../redux/profiles/selectors";
import { actions } from "../../redux/profiles/slice";
import Loader from "../Loader";
import { VoterCheckType } from "../../redux/profiles/types";

type EditProfileProps = {
  open: boolean;
  onClose: () => void;
};

const EditProfileModal: FC<EditProfileProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectDefaultProfile);
  const loadingProfile = useAppSelector(
    (state) => state.profiles.loadingProfile
  );
  const isValidateProfToEdit = useAppSelector(selectValidProfile);

  const [showDelete, setShowDelete] = useState(false);

  const handleChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: VoterCheckType) => {
      dispatch(
        actions.setUpdateProfileCheck({
          checked: e.target.checked,
          type,
        })
      );
    },
    [dispatch]
  );

  const onHandleClose = useCallback(() => {
    dispatch(actions.setResetProfileInfo());
    onClose();
    setShowDelete(false);
  }, [dispatch, onClose]);

  const updateProfile = useCallback(async () => {
    await dispatch(actions.updateProfileThunk()).unwrap();
    onHandleClose();
  }, [dispatch, onHandleClose]);

  const onDelete = () => {
    setShowDelete(true);
  };

  const confirmedDelete = useCallback(async () => {
    await dispatch(actions.deleteProfileThunk()).unwrap();
    onHandleClose();
  }, [dispatch, onHandleClose]);

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(
        actions.setProfileUpdate({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(
        actions.setProfileUpdate({
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const disableByAddress = useMemo(() => {
    if (
      (!profile.isRegistered && !profile.votingOutsideDvo) ||
      (profile.outsideDvo && profile.isRegistered) ||
      (!profile.outsideDvo && profile.votingOutsideDvo)
    ) {
      return true;
    }
    return false;
  }, [profile.isRegistered, profile.outsideDvo, profile.votingOutsideDvo]);

  const onSelectDate = useCallback(
    (value: Date | null, field: "birthdate" | "divineAppointmentDate") => {
      const dt = new Date(value!);
      const year = dt.getUTCFullYear();
      const month = dt.getUTCMonth() + 1; // Date provides month index; not month number
      const day = dt.getUTCDate();

      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1000) {
        dispatch(
          actions.setProfileUpdate({
            name: field,
            value: dt.toISOString() || null,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <>
      <Loader loading={loadingProfile} indexIn="modal" />
      <Dialog fullWidth maxWidth="xl" open={open} onClose={onHandleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Typography fontWeight="bold">Personal Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                value={profile.firstName}
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                value={profile.middleName}
                id="middleName"
                name="middleName"
                label="Middle Name"
                fullWidth
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                value={profile.lastName}
                name="lastName"
                fullWidth
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
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
                  value={profile.status}
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
            <Grid item xs={12} sm={3}>
              <DatePicker
                label="Birthdate"
                name="birthdate"
                onChange={(e) => onSelectDate(e, "birthdate")}
                value={new Date(profile.birthdate!)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    fullWidth: true,
                    placeholder: "Birthdate",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="outsideDvo"
                    checked={profile.outsideDvo}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => handleChecked(e, "currOutside")}
                  />
                }
                label="Currently residing outside davao"
              />
              <Typography variant="body2" fontStyle="italic" color="grey">
                *No need to input district and barangay if address is not in
                davao
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="personal address"
                variant="standard"
                value={profile.address}
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ ml: -2 }} id="gender-select-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender"
                  name="gender"
                  label="Gender"
                  value={profile.gender}
                  onChange={onSelectChange}
                  variant="standard"
                >
                  <MenuItem value={Gender.Male}>Male</MenuItem>
                  <MenuItem value={Gender.Female}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DistrictSelect
                onSelect={onSelectChange}
                outsideDavao={profile.outsideDvo}
                selectedValue={profile.district}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <BarangaySelect
                onSelect={onSelectChange}
                districtValue={profile.district}
                selectedValue={profile.barangay}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="city"
                name="city"
                label="City/Municipality"
                fullWidth
                autoComplete="personal address-city"
                variant="standard"
                value={profile.city}
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="region"
                name="region"
                label="Province/Region"
                fullWidth
                autoComplete="personal address-region"
                variant="standard"
                value={profile.region}
                onChange={onChangeText}
              />
            </Grid>
          </Grid>
          <Typography fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
            Church Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <NetworkHeadsSelect
                onSelect={onSelectChange}
                selectedValue={profile.networkHead}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
                  value={profile.leadershipLevel}
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
                  <MenuItem value={LeadershipLevel.ThreeFourFiveSix}>
                    3456
                  </MenuItem>
                  <MenuItem value={LeadershipLevel.TwentyK}>20K</MenuItem>
                  <MenuItem value={LeadershipLevel.Multitudes}>
                    Multitudes
                  </MenuItem>
                  <MenuItem value={LeadershipLevel.Visitors}>
                    Visitors / House Churches
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
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
                value={
                  profile.divineAppointmentDate
                    ? new Date(profile.divineAppointmentDate!)
                    : null
                }
                onChange={(e) => onSelectDate(e, "divineAppointmentDate")}
              />
            </Grid>
          </Grid>
          <Typography fontWeight="bold" sx={{ mt: 5 }}>
            Voter's Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                sx={{ mt: 3 }}
                control={
                  <Checkbox
                    color="primary"
                    name="isRegistered"
                    checked={profile.isRegistered}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => handleChecked(e, "forVoter")}
                  />
                }
                label="Registered voter"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                sx={{ mt: 3 }}
                control={
                  <Checkbox
                    color="primary"
                    name="votingOutsideDvo"
                    checked={profile.votingOutsideDvo}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => handleChecked(e, "outSideVoter")} // TODO:
                  />
                }
                label="Registered voter (Outside Davao)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                disabled={disableByAddress}
                sx={{ mt: 3 }}
                control={
                  <Checkbox
                    color="primary"
                    name="sameAddress"
                    checked={profile.sameAddress}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => handleChecked(e, "sameDetails")} // TODO:
                  />
                }
                label="Details is same with present info"
              />
              <Typography variant="body2" fontStyle="italic" color="grey">
                *Check if your voter's info is the same as your personal info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                disabled={!profile.isRegistered && !profile.votingOutsideDvo}
                id="votingPrecinctId"
                name="votingPrecinctId"
                label="Precinct ID"
                value={profile.votingPrecinctId || ""}
                fullWidth
                autoComplete="precinct-id"
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <DistrictSelect
                forVoter
                onSelect={onSelectChange}
                outsideDavao={profile.votingOutsideDvo}
                disabled={!profile.isRegistered && !profile.votingOutsideDvo}
                selectedValue={profile.votingDistrict || "poblacion"}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <BarangaySelect
                forVoter
                onSelect={onSelectChange}
                disabled={!profile.isRegistered && !profile.votingOutsideDvo}
                districtValue={profile.votingDistrict || "poblacion"}
                selectedValue={profile.votingBarangay || "1-A"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                disabled={!profile.isRegistered && !profile.votingOutsideDvo}
                id="votingCity"
                name="votingCity"
                label="City/Municipality"
                fullWidth
                value={profile.votingCity || ""}
                autoComplete="personal address-city"
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="votingRegion"
                disabled={!profile.isRegistered && !profile.votingOutsideDvo}
                name="votingRegion"
                label="Province/Region"
                fullWidth
                value={profile.votingRegion || ""}
                autoComplete="personal address-region"
                variant="standard"
                onChange={onChangeText}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 1,
          }}
        >
          {!showDelete ? (
            <Button color="error" onClick={onDelete}>
              Delete
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Are you sure?</Typography>
              <Button color="error" onClick={confirmedDelete}>
                Yes
              </Button>
              <Button onClick={() => setShowDelete(false)}>No</Button>
            </Stack>
          )}
          <Stack direction="row" spacing={3}>
            <Button onClick={onHandleClose}>Cancel</Button>
            <Button onClick={updateProfile} disabled={!isValidateProfToEdit}>
              Update
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
