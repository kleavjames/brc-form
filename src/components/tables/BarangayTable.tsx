import { FC } from "react";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { DistrictBarangays } from "../../redux/profiles/types";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  { field: "name", headerName: "Barangay Name", width: 210 },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    align: "center",
    headerAlign: "center",
    width: 120,
  },
  {
    field: "registered",
    headerName: "Registered",
    description:
      "This is the total registered voters for the specific barangay",
    type: "number",
    align: "center",
    headerAlign: "center",
    width: 120,
  },
  {
    field: "nonRegistered",
    headerName: "Non Registered",
    description:
      "This is the total non registered voters for the specific barangay",
    type: "number",
    sortable: true,
    align: "center",
    width: 120,
    headerAlign: "center",
  },
];

interface Props {
  rows: DistrictBarangays[];
}

const BarangayDataTable: FC<Props> = ({ rows = [] }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        disableDensitySelector
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 15, 50]}
      />
    </Box>
  );
};

export default BarangayDataTable;
