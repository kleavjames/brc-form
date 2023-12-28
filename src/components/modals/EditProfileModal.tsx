import { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Profile } from "../../types/profile";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Barangays,
  Gender,
  LeadershipLevel,
  Status,
} from "../../types/information";
import DistrictSelect from "../DistrictSelect";
import BarangaySelect from "../BarangaySelect";
import { barangays } from "../../constants/barangay";
import Typography from "@mui/material/Typography";
import NetworkHeadsSelect from "../NetworkHeadsSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

type EditProfileProps = {
  open: boolean;
  onClose: () => void;
  profile: Profile;
  onHandleUpdate: (profile: Profile, id: string) => Promise<void>;
  onHandleDelete: (id: string) => Promise<void>;
};

const EditProfileModal: FC<EditProfileProps> = ({
  open,
  onClose,
  profile,
  onHandleUpdate,
  onHandleDelete,
}) => {
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [showDelete, setShowDelete] = useState(false);

  const checkedVoting = useMemo(() => {
    if (
      editProfile?.isRegistered === undefined ||
      editProfile?.isRegistered === null
    ) {
      return profile.isRegistered;
    } else {
      return editProfile?.isRegistered;
    }
  }, [editProfile?.isRegistered, profile.isRegistered]);

  const onHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditProfile((prevProps) => ({
        ...prevProps!,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const onSelectDistrict = useCallback((e: SelectChangeEvent<string>) => {
    setEditProfile((prevProps) => ({
      ...prevProps!,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSelectBarangay = useCallback(
    (e: SelectChangeEvent<string>) => {
      const districtNum = (barangays as unknown as Barangays)[
        editProfile?.district as string
      ][0].district;
      setEditProfile((prevProps) => ({
        ...prevProps!,
        districtNumber: districtNum,
        [e.target.name]: e.target.value,
      }));
    },
    [editProfile?.district]
  );

  const onSelectVotingBarangay = useCallback(
    (e: SelectChangeEvent<string>) => {
      const districtNum = (barangays as unknown as Barangays)[
        editProfile?.votingDistrict as string
      ][0].district;
      setEditProfile((prevProps) => ({
        ...prevProps!,
        votingDistrictNumber: districtNum,
        [e.target.name]: e.target.value,
      }));
    },
    [editProfile?.votingDistrict]
  );

  const handleVoteChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.checked) {
        setEditProfile((prevProps) => ({
          ...prevProps!,
          votingPrecinctId: null,
          votingBarangay: null,
          votingDistrict: null,
          votingDistrictNumber: null,
          votingCity: null,
          votingRegion: null,
          isRegistered: e.target.checked,
        }));
        return;
      }

      setEditProfile((prevProps) => ({
        ...prevProps!,
        [e.target.name]: e.target.checked,
      }));
    },
    []
  );

  const onHandleClose = useCallback(() => {
    onClose();
    setEditProfile(null);
    setShowDelete(false);
  }, [onClose]);

  const updateProfile = useCallback(async () => {
    await onHandleUpdate(editProfile!, profile._id!);
    onHandleClose();
  }, [editProfile, onHandleClose, onHandleUpdate, profile._id]);

  const onDelete = () => {
    setShowDelete(true);
  };

  const confirmedDelete = async () => {
    await onHandleDelete(profile._id!);
    onHandleClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xl" open={open} onClose={onHandleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Typography fontWeight="bold">Personal Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                value={editProfile?.firstName || profile.firstName}
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                variant="standard"
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                value={editProfile?.middleName || profile.middleName}
                id="middleName"
                name="middleName"
                label="Middle Name"
                fullWidth
                variant="standard"
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                value={editProfile?.lastName || profile.lastName}
                name="lastName"
                fullWidth
                variant="standard"
                onChange={onHandleChange}
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
                  value={editProfile?.status || profile.status}
                  onChange={(e) => {
                    setEditProfile((prevProps) => ({
                      ...prevProps!,
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
            <Grid item xs={12} sm={3}>
              <DatePicker
                label="Birthdate"
                name="birthdate"
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    birthdate: e,
                  }));
                }}
                value={new Date(editProfile?.birthdate || profile.birthdate!)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    fullWidth: true,
                    placeholder: "Birthdate",
                  },
                }}
              />
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
                value={editProfile?.address || profile.address}
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    [e.target.name]: e.target.value,
                  }));
                }}
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
                  value={editProfile?.gender || profile.gender}
                  onChange={(e) => {
                    setEditProfile((prevProps) => ({
                      ...prevProps!,
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
              <DistrictSelect
                onSelect={onSelectDistrict}
                selectedValue={editProfile?.district || profile.district}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <BarangaySelect
                onSelect={onSelectBarangay}
                districtValue={editProfile?.district || profile.district}
                selectedValue={editProfile?.barangay || profile.barangay}
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
                value={editProfile?.city || profile.city}
                onChange={onHandleChange}
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
                value={editProfile?.region || profile.region}
                onChange={onHandleChange}
              />
            </Grid>
          </Grid>
          <Typography fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
            Church Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <NetworkHeadsSelect
                onSelect={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    [e.target.name]: e.target.value,
                  }));
                }}
                selectedValue={editProfile?.networkHead || profile.networkHead}
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
                  value={
                    editProfile?.leadershipLevel || profile.leadershipLevel
                  }
                  onChange={(e) => {
                    setEditProfile((prevProps) => ({
                      ...prevProps!,
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
                  new Date(
                    editProfile?.divineAppointmentDate ||
                      profile.divineAppointmentDate!
                  )
                }
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    divineAppointmentDate: e,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Typography fontWeight="bold" sx={{ mt: 5 }}>
            Voter's Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                sx={{ mt: 3 }}
                control={
                  <Checkbox
                    color="primary"
                    name="isRegistered"
                    checked={checkedVoting}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={handleVoteChecked}
                  />
                }
                label="Registered voter"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                disabled={!checkedVoting}
                id="votingPrecinctId"
                name="votingPrecinctId"
                label="Precinct ID"
                value={
                  editProfile?.votingPrecinctId || profile.votingPrecinctId
                }
                fullWidth
                autoComplete="precinct-id"
                variant="standard"
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <DistrictSelect
                forVoter
                onSelect={onSelectDistrict}
                disabled={!checkedVoting}
                selectedValue={
                  editProfile?.votingDistrict || profile.votingDistrict!
                }
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <BarangaySelect
                forVoter
                onSelect={onSelectVotingBarangay}
                disabled={!checkedVoting}
                districtValue={
                  (editProfile?.votingDistrict ?? profile.votingDistrict) ||
                  "poblacion"
                }
                selectedValue={
                  editProfile?.votingBarangay || profile.votingBarangay!
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                disabled={!checkedVoting}
                id="votingCity"
                name="votingCity"
                label="City/Municipality"
                fullWidth
                value={editProfile?.votingCity || profile.votingCity}
                autoComplete="personal address-city"
                variant="standard"
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="votingRegion"
                disabled={!checkedVoting}
                name="votingRegion"
                label="Province/Region"
                fullWidth
                value={editProfile?.votingRegion || profile.votingRegion}
                autoComplete="personal address-region"
                variant="standard"
                onChange={(e) => {
                  setEditProfile((prevProps) => ({
                    ...prevProps!,
                    [e.target.name]: e.target.value,
                  }));
                }}
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
            <Button onClick={updateProfile}>Update</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
