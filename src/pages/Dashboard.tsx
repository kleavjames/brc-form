import { Fragment, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import BarangayTable from "../components/tables/BarangayTable";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectDistrictOneBarangay,
  selectDistrictThreeBarangay,
  selectDistrictTwoBarangay,
  selectProfileNetworkHead,
  selectTotalProfiles,
} from "../redux/profiles/selectors";
import NetworkHeadsSelect from "../components/NetworkHeadsSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import { actions } from "../redux/profiles/slice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotalProfiles);
  const networkHead = useAppSelector(selectProfileNetworkHead);
  const districtOneBarangays = useAppSelector(selectDistrictOneBarangay);
  const districtTwoBarangays = useAppSelector(selectDistrictTwoBarangay);
  const districtThreeBarangays = useAppSelector(selectDistrictThreeBarangay);

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(actions.setFilterByNetworkHead(e.target.value));
    },
    [dispatch]
  );

  return (
    <Fragment>
      <Box sx={{ m: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary" variant="h4" fontWeight="700">
                PROFILING SUMMARY
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%", lg: "25%" },
                  mt: { xs: 5, md: 0 },
                  px: { xs: 2, md: 0 },
                }}
              >
                <NetworkHeadsSelect
                  forFilter
                  onSelect={onSelectChange}
                  selectedValue={networkHead}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ m: 3 }}>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="600">
                BRC Profiles
              </Typography>
              <Typography color="secondary" variant="h2" fontWeight="700">
                {total.totalProfiles}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                Registered Voters (Davao)
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalRegistered}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                Registered Voters (Outside Davao)
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalRegisteredOutside}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                Not Registered Voter
              </Typography>
              <Typography color="GrayText" variant="h2" fontWeight="700">
                {total.totalNonRegistered}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                District I
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalDistrict1}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                District II
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalDistrict2}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                District III
              </Typography>
              <Typography color="primary" variant="h2" fontWeight="700">
                {total.totalDistrict3}
              </Typography>
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
                    data: [
                      "District I",
                      "District II",
                      "District III",
                      "Outside Davao",
                    ],
                  },
                ]}
                series={[
                  {
                    data: [
                      total.totalDistrict1,
                      total.totalDistrict2,
                      total.totalDistrict3,
                      total.totalOutside,
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
                      total.nonTotalOutside,
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
            <Paper
              elevation={0}
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h6" fontWeight="500">
                Registered Voters
              </Typography>
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                  "& .MuiChartsLegend-root": {
                    display: { xs: "none", lg: "block" },
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
                        color: "#0037a8",
                      },
                      {
                        id: 3,
                        value: total.totalOutside,
                        label: "Outside Davao",
                        color: "#464646",
                      },
                    ],
                  },
                ]}
                height={400}
                margin={{
                  // left: 80,
                  right: 0,
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
              <Typography color="primary" variant="h4" fontWeight="700">
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
