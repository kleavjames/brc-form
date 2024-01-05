import { Fragment, useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridEventListener,
  GridToolbar,
  GridValueFormatterParams,
  gridClasses,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import format from "date-fns/format";
import { Typography } from "@mui/material";
import EditProfileModal from "../components/modals/EditProfileModal";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectProfiles } from "../redux/profiles/selectors";
import { Gender, LeadershipLevel, Status } from "../redux/profiles/enums";
import { actions } from "../redux/profiles/slice";

const Profiles = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);
  const loadingProfileTable = useAppSelector(
    (state) => state.profiles.loadingProfileTable
  );

  const [openEdit, setOpenEdit] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 250,
      sortable: true,
      filterable: true,
      valueGetter: ({ row }) => {
        return `${row.firstName} ${row.middleName} ${row.lastName}`;
      },
    },
    {
      field: "birthdate",
      headerName: "Birth Date",
      width: 170,
      sortable: false,
      filterable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return format(new Date(params.value), "MMMM dd, yyyy");
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      filterable: true,
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === Gender.Male) {
          return "Male";
        } else {
          return "Female";
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      filterable: true,
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        switch (params.value) {
          case Status.Married:
            return "Married";
          case Status.Divorced:
            return "Divorced";
          case Status.Single:
            return "Single";
          case Status.Widowed:
            return "Widowed";
          default:
            return "Married";
        }
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 400,
      filterable: false,
      sortable: false,
      valueGetter: ({ row }) => {
        return `${row.address} ${row.barangay}, ${row.city}, ${row.region}`;
      },
    },
    {
      type: "number",
      field: "districtNumber",
      headerName: "District",
      filterable: true,
      sortable: false,
      align: "left",
      width: 140,
      headerAlign: "left",
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value === 0) {
          return "Outside Davao";
        }
        return params.value;
      },
    },
    {
      field: "networkHead",
      headerName: "Network Head",
      width: 200,
      filterable: true,
      sortable: false,
    },
    {
      field: "leadershipLevel",
      headerName: "Level",
      filterable: true,
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        switch (params.value) {
          case LeadershipLevel.SeniorPastor:
            return "Senior Pastor";
          case LeadershipLevel.NetworkHead:
            return "Network Head";
          case LeadershipLevel.Multitudes:
            return "Multitudes";
          case LeadershipLevel.NetworkChurch:
            return "Network Church";
          case LeadershipLevel.Visitors:
            return "Visitors";
          default:
            return params.value;
        }
      },
    },
    {
      field: "divineAppointmentDate",
      headerName: "DA Date",
      width: 170,
      filterable: true,
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === null) {
          return "";
        }
        return format(new Date(params.value), "MMMM, yyyy");
      },
    },
    {
      field: "votingPrecinctId",
      headerName: "Precinct ID",
      filterable: false,
      sortable: false,
    },
    {
      type: "number",
      field: "votingDistrictNumber",
      headerName: "Voting District",
      width: 150,
      filterable: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value === 0) {
          return "Outside Davao";
        }
        return params.value;
      },
    },
    {
      field: "votingAddress",
      headerName: "Voting Address",
      width: 400,
      filterable: false,
      sortable: false,
      valueGetter: ({ row }) => {
        if (row.votingDistrict === "outside") {
          return "Outside Davao";
        }
        if (!row.votingBarangay || !row.votingCity || !row.votingRegion) {
          return "";
        }
        return `${row.votingBarangay}, ${row.votingCity}, ${row.votingRegion}`;
      },
    },
  ];

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
        { field: "district" },
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

  const handleRowClick: GridEventListener<"rowDoubleClick"> = useCallback(
    (params) => {
      dispatch(actions.setSelectedProfile(params.row._id));
      setOpenEdit(true);
    },
    [dispatch]
  );

  const onCloseModal = useCallback(() => {
    dispatch(actions.setSelectedProfile(null));
    setOpenEdit(false);
  }, [dispatch]);

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
    </Fragment>
  );
};

export default Profiles;
