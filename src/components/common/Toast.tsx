import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { toastStore } from "@/store/toastStore";

const Toast = observer(() => {
  const currentToast = toastStore.toasts[0];
  const severityClassName =
    currentToast?.severity === "success"
      ? "border-accent/35 text-accent"
      : currentToast?.severity === "warning"
        ? "border-warn/35 text-warn"
        : currentToast?.severity === "error"
          ? "border-rose-400/35 text-rose-300"
          : "border-accent2/35 text-accent2";

  return (
    <>
      {currentToast && (
        <Box className="fixed left-1/2 top-4 z-[120] w-[min(calc(100vw-24px),28rem)] -translate-x-1/2">
          <Box className={`glass-card flex items-start gap-3 border px-4 py-3 shadow-2xl ${severityClassName}`}>
            <Box className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-current" />
            <Box className="min-w-0 flex-1">
              <Typography className="text-[13px] font-semibold leading-5 text-text">
                {currentToast.message}
              </Typography>
            </Box>
            <button
              type="button"
              onClick={() => toastStore.removeToast(currentToast.id)}
              className="text-text3 transition-colors hover:text-text"
              aria-label="토스트 닫기"
            >
              ×
            </button>
          </Box>
        </Box>
      )}

      {toastStore.isLoading && (
        <Box className="fixed inset-0 z-[130] flex items-center justify-center bg-black/45 backdrop-blur-sm">
          <Box className="glass-card flex items-center gap-3 rounded-2xl px-5 py-4">
            <Box className="h-5 w-5 animate-spin rounded-full border-2 border-accent2/30 border-t-accent2" />
            <Typography className="text-sm font-medium text-text">불러오는 중...</Typography>
          </Box>
        </Box>
      )}
    </>
  );
});

export default Toast;
