import { Fragment } from "react";
import {
  DataGrid,
  GridColumnGroupingModel,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditProfileModal from "../components/modals/EditProfileModal";
import { useProfiles } from "../hooks/useProfiles";

const Profiles = () => {
  const {
    profiles,
    brgyColumns,
    columns,
    openEdit,
    onCloseModal,
    loadingProfileTable,
    handleRowClick,
  } = useProfiles();

  // grouping by profiles
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "personal_data",
      headerName: "Personal Information",
      renderHeaderGroup: (params) => (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {params.headerName}
        </Typography>
      ),
      children: [
        { field: "fullName" },
        { field: "birthdate" },
        { field: "gender" },
        { field: "status" },
        { field: "address" },
        { field: "districtNumber" },
      ],
    },
    {
      groupId: "church_data",
      headerName: "Church Information",
      renderHeaderGroup: (params) => (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {params.headerName}
        </Typography>
      ),
      children: [
        { field: "networkHead" },
        { field: "leadershipLevel" },
        { field: "divineAppointmentDate" },
      ],
    },
    {
      groupId: "voters_info",
      headerName: "Voters Information",
      renderHeaderGroup: (params) => (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {params.headerName}
        </Typography>
      ),
      children: [
        { field: "votingPrecinctId" },
        { field: "votingDistrictNumber" },
        { field: "votingAddress" },
      ],
    },
  ];

  // grouping by barangay profiles
  const brgyColumnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "personal_data",
      headerName: "Personal Information",
      renderHeaderGroup: (params) => (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {params.headerName}
        </Typography>
      ),
      children: [
        { field: "fullName" },
        { field: "networkHead" },
        { field: "districtNumber" },
        { field: "barangay" },
      ],
    },
    {
      groupId: "voters_info",
      headerName: "Voters Information",
      renderHeaderGroup: (params) => (
        <Typography variant="h6" color="primary" fontWeight="bold">
          {params.headerName}
        </Typography>
      ),
      children: [
        { field: "votingPrecinctId" },
        { field: "votingDistrictNumber" },
        { field: "votingBarangay" },
      ],
    },
  ];

  return (
    <Fragment>
      <EditProfileModal open={openEdit} onClose={onCloseModal} />
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ mx: 3, mt: 3, p: { xs: 2, md: 3 } }}>
            <Typography color="primary" variant="h4" fontWeight="500">
              LEADERS PROFILE
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={12} sx={{ m: 3 }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <DataGrid
              autoHeight
              getRowHeight={() => "auto"}
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}
              getRowId={(row) => row._id}
              columns={columns}
              rows={profiles}
              loading={loadingProfileTable}
              disableDensitySelector
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              onRowDoubleClick={handleRowClick}
              pageSizeOptions={[10, 25, 50, 100]}
              experimentalFeatures={{ columnGrouping: true }}
              slots={{
                toolbar: GridToolbar,
              }}
              columnGroupingModel={columnGroupingModel}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ mx: 3, p: { xs: 2, md: 3 } }}>
            <Typography color="primary" variant="h4" fontWeight="500">
              PROFILES BY BARANGAY
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={12} sx={{ m: 3 }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <DataGrid
              autoHeight
              getRowHeight={() => "auto"}
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}
              getRowId={(row) => row._id}
              columns={brgyColumns}
              rows={profiles}
              loading={loadingProfileTable}
              disableDensitySelector
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableColumnSelector
              pageSizeOptions={[10, 25, 50, 100]}
              experimentalFeatures={{ columnGrouping: true }}
              slots={{
                toolbar: GridToolbar,
              }}
              columnGroupingModel={brgyColumnGroupingModel}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profiles;
