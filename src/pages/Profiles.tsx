import React, { Fragment } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

function Profiles() {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sx={{ m: 3}}>
          <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
            <Typography>Test</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Profiles