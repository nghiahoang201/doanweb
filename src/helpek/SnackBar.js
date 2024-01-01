import { Alert, Snackbar } from "@mui/material";

const SnackBar = ({ snack, setSnack }) => {
  return (
    <Snackbar
      open={snack?.open}
      onClose={() =>
        setSnack({
          open: false,
          error: snack?.error ? true : false,
          message: snack?.message,
        })
      }
      autoHideDuration={4000}
    >
      {snack?.error ? (
        <Alert
          onClose={() =>
            setSnack({
              open: false,
              error: true,
              message: snack?.message,
            })
          }
          severity="error"
          sx={{ width: "100%", color: " #d74242", fontWeight: "700" }}
        >
          {snack?.message}
        </Alert>
      ) : (
        <Alert
          onClose={() =>
            setSnack({
              open: false,
              error: false,
              message: snack?.message,
            })
          }
          severity="success"
          sx={{ width: "100%", color: " #2e7d32", fontWeight: "700" }}
        >
          {snack?.message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default SnackBar;
