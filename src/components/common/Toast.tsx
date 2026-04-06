import React from "react";
import { observer } from "mobx-react-lite";
import { Snackbar, Alert, CircularProgress, Backdrop } from "@mui/material";
import { toastStore } from "@/store/toastStore";

const Toast = observer(() => {
  const currentToast = toastStore.toasts[0];

  return (
    <>
      {/* Toast Notifications */}
      <Snackbar
        open={!!currentToast}
        autoHideDuration={6000}
        onClose={() => currentToast && toastStore.removeToast(currentToast.id)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => currentToast && toastStore.removeToast(currentToast.id)}
          severity={currentToast?.severity || "info"}
          sx={{ 
            width: "100%", 
            borderRadius: "16px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          {currentToast?.message}
        </Alert>
      </Snackbar>

      {/* Global Loading Spinner */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={toastStore.isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
});

export default Toast;
