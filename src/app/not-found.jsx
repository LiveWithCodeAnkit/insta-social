import { Box, Typography } from "@mui/material";
const NotFoundPage = () => {
  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"10%"
        }}
      >
        <Box>
          <h1>Not Found</h1>
          <p>Looks like this page does not exist!</p>
        </Box>
      </Box>
    </>
  );
};

export default NotFoundPage;
