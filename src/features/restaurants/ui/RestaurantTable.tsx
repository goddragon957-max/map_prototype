import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// AG-Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";
import { EllipsisRenderer } from "@/components/common/ag-grid/renderers";

const RestaurantTable = observer(() => {
  const rowData = restaurantStore.filteredRestaurants;

  const columnDefs: ColDef[] = useMemo(() => [
    { 
      headerName: "식당명", 
      field: "name", 
      flex: 1.2, 
      cellRenderer: EllipsisRenderer,
      headerClass: "ag-header-center" 
    },
    { 
      headerName: "지역", 
      field: "area", 
      flex: 0.8,
      headerClass: "ag-header-center" 
    },
    { 
      headerName: "가격", 
      field: "priceLabel", 
      flex: 1,
      headerClass: "ag-header-center" 
    },
    { 
      headerName: "요약", 
      field: "summary", 
      flex: 2, 
      cellRenderer: EllipsisRenderer,
      headerClass: "ag-header-center" 
    },
    { 
      headerName: "평점", 
      field: "rating", 
      flex: 0.6,
      headerClass: "ag-header-center" 
    },
  ], []);

  const theme = themeQuartz.withParams({
    headerBackgroundColor: "rgba(248, 250, 252, 0.8)",
    headerTextColor: "#64748b",
    headerFontWeight: 700,
    headerColumnResizeHandleColor: "rgba(0, 0, 0, 0.05)",
    rowHoverColor: "rgba(59, 130, 246, 0.05)",
    selectedRowBackgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "12px",
    headerHeight: "44px",
    rowHeight: "48px",
  });

  return (
    <Box className="glass-card p-4 rounded-[28px] bg-white/86 min-h-[300px]">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="text-xl font-bold">식당 목록</Typography>
        <Typography className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">
          {rowData.length}곳
        </Typography>
      </Box>
      <Box className="ag-theme-quartz-light" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          theme={theme}
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={(params) => {
            if (params.data) restaurantStore.setSelectedId(params.data.id);
          }}
          rowSelection={{
            mode: "singleRow",
            enableClickSelection: true,
            checkboxes: false,
          }}
          defaultColDef={{
            resizable: true,
            sortable: true,
          }}
        />
      </Box>
    </Box>
  );
});

export default RestaurantTable;
