import { useCallback, useState } from "react";
import {
  GridColDef,
  GridEventListener,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import format from "date-fns/format";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectProfiles } from "../redux/profiles/selectors";
import { Gender, LeadershipLevel, Status } from "../redux/profiles/enums";
import { actions } from "../redux/profiles/slice";

export const useProfiles = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);
  const loadingProfileTable = useAppSelector(
    (state) => state.profiles.loadingProfileTable
  );

  const [openEdit, setOpenEdit] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "registered",
      headerName: "Registered",
      type: "boolean",
      sortable: true,
      filterable: true,
      valueGetter: ({ row }) => {
        if (row.isRegistered || row.votingOutsideDvo) {
          return true;
        } else {
          return false;
        }
      },
    },
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

  const brgyColumns: GridColDef[] = [
    {
      field: "registered",
      headerName: "Registered",
      type: "boolean",
      sortable: true,
      filterable: true,
      valueGetter: ({ row }) => {
        if (row.isRegistered || row.votingOutsideDvo) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 300,
      sortable: true,
      filterable: true,
      valueGetter: ({ row }) => {
        return `${row.firstName} ${row.middleName} ${row.lastName}`;
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
      field: "districtNumber",
      headerName: "District",
      filterable: true,
      sortable: true,
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
      field: "barangay",
      headerName: "Barangay",
      width: 400,
      filterable: true,
      sortable: true,
    },
    {
      field: "votingPrecinctId",
      headerName: "Precinct ID",
      width: 150,
      filterable: true,
      sortable: true,
    },
    {
      type: "number",
      field: "votingDistrictNumber",
      headerName: "Voting District",
      width: 150,
      filterable: true,
      sortable: true,
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
      field: "votingBarangay",
      headerName: "Voting Barangay",
      width: 400,
      filterable: true,
      sortable: true,
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

  return {
    profiles,
    columns,
    brgyColumns,
    openEdit,
    handleRowClick,
    onCloseModal,
    loadingProfileTable,
  };
};
