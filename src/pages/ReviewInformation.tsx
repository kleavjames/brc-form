import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import format from "date-fns/format";
import { districts } from "../constants/district";
import { Gender } from "../redux/profiles/enums";
import { useAppSelector } from "../redux/store";
import {
  selectChurchInfo,
  selectPersonalInfo,
  selectVotersInfo,
} from "../redux/profiles/selectors";

export default function ReviewInformation() {
  const personalInfo = useAppSelector(selectPersonalInfo);
  const churchInfo = useAppSelector(selectChurchInfo);
  const votersInfo = useAppSelector(selectVotersInfo);

  const votersDistrict = React.useMemo(() => {
    let districtName = "";

    districts.find((dist) => {
      return dist.subdistrict.find((sub) => {
        if (sub.key === votersInfo.votingDistrict) {
          districtName = `${dist.name} - ${sub.value}`;
        }
      });
    });

    return districtName;
  }, [votersInfo.votingDistrict]);

  const personalDistrict = React.useMemo(() => {
    let districtName = "";

    districts.find((dist) => {
      return dist.subdistrict.find((sub) => {
        if (sub.key === personalInfo.district) {
          districtName = `${dist.name} - ${sub.value}`;
        }
      });
    });

    return districtName;
  }, [personalInfo.district]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information Summary
      </Typography>
      <Typography>Please double check information.</Typography>
      <Stack spacing={3} sx={{ mt: 5 }}>
        <Box>
          <Typography fontWeight="700" gutterBottom>
            Personal Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            <ListItem>
              <ListItemText primary="Full Name" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.firstName} {personalInfo.middleName}{" "}
                {personalInfo.lastName}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Birth Date" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {format(new Date(personalInfo.birthdate!), "MMMM dd, yyyy")}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.gender === Gender.Male ? "Male" : "Female"}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.status.toLocaleUpperCase()}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.address}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Barangay" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.barangay}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="District" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalDistrict}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="City/Region" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {personalInfo.city}, {personalInfo.region}
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography fontWeight="700" gutterBottom>
            Church Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            <ListItem>
              <ListItemText primary="Network Head" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {churchInfo.networkHead}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Leadership Level" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {churchInfo.leadershipLevel}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Divine Appointment Date" />
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                color="primary"
              >
                {format(
                  new Date(churchInfo.divineAppointmentDate!),
                  "MMMM yyyy"
                )}
              </Typography>
            </ListItem>
          </List>
        </Box>
        {votersInfo.isRegistered || votersInfo.votingOutsideDvo ? (
          <Box>
            <Typography fontWeight="700" gutterBottom>
              Voters Address
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List disablePadding>
              <ListItem>
                <ListItemText primary="Precint ID" />
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                  color="primary"
                >
                  {votersInfo.votingPrecinctId || ""}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Barangay" />
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                  color="primary"
                >
                  {votersInfo.votingOutsideDvo
                    ? "Outside Davao"
                    : votersInfo.isRegistered
                    ? votersInfo.votingBarangay
                    : ""}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="District" />
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                  color="primary"
                >
                  {votersInfo.votingOutsideDvo
                    ? "Outside Davao"
                    : votersInfo.isRegistered
                    ? votersDistrict
                    : ""}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="City/Region" />
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-wrap", textAlign: "right" }}
                  color="primary"
                >
                  {votersInfo.votingCity}, {votersInfo.votingRegion}
                </Typography>
              </ListItem>
            </List>
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Divider sx={{ my: 3 }} />
            <Typography
              textAlign="center"
              variant="body1"
              fontStyle="italic"
              color="gray"
            >
              Currently not registered as a voter
            </Typography>
          </Box>
        )}
        <Divider sx={{ my: 2 }} />
      </Stack>
    </React.Fragment>
  );
}
