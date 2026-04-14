import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import Box from "@/components/common/Box";

export const EllipsisRenderer = (params: ICellRendererParams) => {
  if (params.value === "" || params.value === null || params.value === undefined) {
    return "";
  }

  return (
    <Box
      title={params.value}
      className="truncate w-full h-full flex items-center"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {params.value}
    </Box>
  );
};
