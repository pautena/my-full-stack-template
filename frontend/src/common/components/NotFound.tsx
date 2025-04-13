import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Oops!
      </Typography>
      <Typography variant="body1">Page not found.</Typography>
      <Button href="/" color="secondary" sx={{ mt: 2 }}>
        Go back
      </Button>
    </Box>
  );
};

export default NotFound;
