import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function ReviewInformation() {
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
              <Typography variant="body2">Kleavant James Olmedo</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Birth Date" />
              <Typography variant="body2">May 16, 1991</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender" />
              <Typography variant="body2">Male</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" />
              <Typography variant="body2">Married</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" />
              <Typography variant="body2">
                Block 62 Lot 24 Bloodstone Steet, Deca Homes Esperanza
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Barangay" />
              <Typography variant="body2">Tigatto</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="District" />
              <Typography variant="body2">District II - Buhangin</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="City/Region" />
              <Typography variant="body2">Davao City, Davao Del Sur</Typography>
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
              <Typography variant="body2">Pastor Duane Gencianos</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Leadership Level" />
              <Typography variant="body2">288</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Divine Appointment Date" />
              <Typography variant="body2">November 2012</Typography>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography fontWeight="700" gutterBottom>
            Voters Address
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            <ListItem>
              <ListItemText primary="Precint ID" />
              <Typography variant="body2">1122-B</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Barangay" />
              <Typography variant="body2">Tigatto</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="District" />
              <Typography variant="body2">District II - Buhangin</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="City/Region" />
              <Typography variant="body2">Davao City, Davao Del Sur</Typography>
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Stack>
    </React.Fragment>
  );
}
