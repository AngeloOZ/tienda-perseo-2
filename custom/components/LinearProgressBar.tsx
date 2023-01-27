import { Box, LinearProgress, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  isActive?: boolean;
}

export const LinearProgressBar = ({ isActive = true, ...other }: Props) => {
  if (!isActive) return null;

  return (
    <Box
      component="div"
      display="grid"
      height={{ xs: 'calc(100vh - 144px)', lg: '100%' }}
      margin="auto"
      width={{ xs: '90%', md: '50%' }}
      alignItems={'center'}
      {...other}
    >
      <LinearProgress color="inherit" />
    </Box>
  );
};
