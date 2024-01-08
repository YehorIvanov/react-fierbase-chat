import { CircularProgress, Container, Grid } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        alignItems={'center'}
        direction={'column'}
        justifyContent={'center'}
      >
        <CircularProgress />
      </Grid>
    </Container>
  );
};

export default Loader;
