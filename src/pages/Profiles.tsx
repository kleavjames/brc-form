import { Fragment } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Profiles = () => {
  const { data } = useDemoData({
    dataSet: "Employee",
    rowLength: 100,
  });

  return (
    <Fragment>
      <Grid>
        <Grid item xs={12} sx={{ m: 3 }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <DataGrid
              {...data}
              density="comfortable"
              disableDensitySelector
              initialState={{
                ...data.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 25, 50]}
              slots={{ toolbar: GridToolbar }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profiles;
