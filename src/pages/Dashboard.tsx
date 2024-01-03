import { Fragment } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import BarangayTable from "../components/tables/BarangayTable";
import { useAppSelector } from "../redux/store";
import {
  selectDistrictOneBarangay,
  selectDistrictThreeBarangay,
  selectDistrictTwoBarangay,
  selectTotalProfiles,
} from "../redux/profiles/selectors";

const Dashboard = () => {
  const total = useAppSelector(selectTotalProfiles);
  const districtOneBarangays = useAppSelector(selectDistrictOneBarangay);
  const districtTwoBarangays = useAppSelector(selectDistrictTwoBarangay);
  const districtThreeBarangays = useAppSelector(selectDistrictThreeBarangay);

  return (
    <Fragment>
      <Box sx={{ m: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
              <Typography color="primary" variant="h4" fontWeight="500">
                PROFILE SUMMARY
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ m: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                Total BRC Profiles
              </Typography>
              <Typography color="secondary" variant="h2" fontWeight="700">
                {total.totalProfiles}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                Total Registered Voters
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalRegistered}&nbsp;
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" fontWeight="500">
                    District I
                  </Typography>
                  <Typography color="primary" variant="h2" fontWeight="700">
                    {total.totalDistrict1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" fontWeight="500">
                    District II
                  </Typography>
                  <Typography color="primary" variant="h2" fontWeight="700">
                    {total.totalDistrict2}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" fontWeight="500">
                    District III
                  </Typography>
                  <Typography color="primary" variant="h2" fontWeight="700">
                    {total.totalDistrict3}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                Districts
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["District I", "District II", "District III"],
                  },
                ]}
                series={[
                  {
                    data: [
                      total.totalDistrict1,
                      total.totalDistrict2,
                      total.totalDistrict3,
                    ],
                    type: "bar",
                    label: "Registered Voters",
                    id: "id1",
                    color: "#5e367f",
                  },
                  {
                    data: [
                      total.nonTotalDistrict1,
                      total.nonTotalDistrict2,
                      total.nonTotalDistrict3,
                    ],
                    type: "bar",
                    label: "Non Registered",
                    id: "id2",
                    color: "#febd22",
                  },
                ]}
                height={400}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                Registered Voters
              </Typography>
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                series={[
                  {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data: [
                      {
                        id: 0,
                        value: total.totalDistrict1,
                        label: "District I",
                        color: "#5e367f",
                      },
                      {
                        id: 1,
                        value: total.totalDistrict2,
                        label: "District II",
                        color: "#febd22",
                      },
                      {
                        id: 2,
                        value: total.totalDistrict3,
                        label: "District III",
                        color: "#464646",
                      },
                    ],
                  },
                ]}
                height={400}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
              <Typography color="primary" variant="h4" fontWeight="500">
                BARANGAY SUMMARY
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                By Barangays (District I)
              </Typography>
              <BarangayTable rows={districtOneBarangays} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                By Barangays (District II)
              </Typography>
              <BarangayTable rows={districtTwoBarangays} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="500">
                By Barangays (District III)
              </Typography>
              <BarangayTable rows={districtThreeBarangays} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Dashboard;
