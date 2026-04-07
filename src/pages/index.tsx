import React from "react";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Head from "next/head";
import AppShell from "@/components/layout/AppShell";
import Header from "@/components/layout/Header";
import Box from "@/components/common/Box";
import RestaurantFilter from "@/features/restaurants/ui/RestaurantFilter";
import RestaurantDetail from "@/features/restaurants/ui/RestaurantDetail";
import RestaurantTable from "@/features/restaurants/ui/RestaurantTable";
import RestaurantRanking from "@/features/restaurants/ui/RestaurantRanking";
import CommunityFeed from "@/features/community/ui/CommunityFeed";
import DealList from "@/features/deals/ui/DealList";
import SubmitModal from "@/features/restaurants/ui/SubmitModal";
import Toast from "@/components/common/Toast";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { uiStore, ViewMode } from "@/store/uiStore";

// Dynamically import KakaoMapBackground to avoid SSR issues
const KakaoMapBackground = dynamic(
  () => import("@/features/restaurants/ui/KakaoMapBackground"),
  { ssr: false }
);

import MapIcon from "@mui/icons-material/Map";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Home = observer(() => {
  const modes: { label: string; value: ViewMode; icon: React.ReactNode }[] = [
    { label: "지도", value: "map", icon: <MapIcon fontSize="small" /> },
    { label: "거지방", value: "community", icon: <GroupsIcon fontSize="small" /> },
    { label: "핫딜", value: "deal", icon: <LocalFireDepartmentIcon fontSize="small" /> },
  ];

  const activeIndex = modes.findIndex((m) => m.value === uiStore.mode);

  return (
    <AppShell>
      <Head>
        <title>Map Prototype | 지도로 찾는 가성비 (Next.js)</title>
      </Head>

      {/* 
         LAYER 0: The Background Map 
         This fills the entire viewport in the background.
      */}
      <KakaoMapBackground />

      {/* 
         LAYER 1: Header/Floating Top Controls
      */}
      <Box className="absolute left-1/2 top-4 -translate-x-1/2 w-full max-w-[1140px] px-4 pointer-events-none z-20">
        <Header />
      </Box>

      {/* 
         LAYER 2: Floating Sidebar / Panels
      */}
      <Box className="absolute left-4 top-[100px] pointer-events-none z-30">
        <RestaurantRanking />
      </Box>

      <Box className="absolute right-4 top-[100px] bottom-[100px] w-[min(380px,calc(100vw-2rem))] pointer-events-none z-30 flex flex-col gap-4">
        <Box className="floating-panel w-full">
          <RestaurantFilter />
        </Box>
        <Box className="floating-panel w-full flex-grow overflow-auto overscroll-contain">
          <RestaurantDetail />
        </Box>
      </Box>

      {/* 
         LAYER 3: Bottom Floating Navigation (Sliding Pill)
      */}
      <Box className="fixed left-1/2 bottom-8 -translate-x-1/2 z-50 pointer-events-auto text-[0.75rem] font-bold text-white/50">
        <Box className="relative flex items-center p-1.5 bg-slate-900/80 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl overflow-hidden min-w-88">
          {/* Sliding Indicator Background */}
          <Box 
            className="absolute top-1.5 bottom-1.5 bg-white/10 rounded-full transition-all duration-300 ease-in-out" 
            style={{ 
              left: `calc(1.5px + (100% - 3px) / ${modes.length} * ${activeIndex})`,
              width: `calc((100% - 3px) / ${modes.length})` 
            }}
          />
          
          {modes.map((m, idx) => (
            <Box
              key={m.value}
              onClick={() => uiStore.setMode(m.value)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 cursor-pointer z-10 transition-colors duration-300 ${
                uiStore.mode === m.value ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Box className={`${uiStore.mode === m.value ? "scale-110" : "scale-100"} transition-transform`}>
                {m.icon}
              </Box>
              <Typography className="text-[0.65rem] font-bold tracking-tighter">
                {m.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 
         LAYER 4: Hidden/Collapsible Content (Table, Feed, Deals)
      */}
      {uiStore.mode !== "map" && (
        <Box className="absolute inset-0 bg-white/95 backdrop-blur-xl z-40 overflow-auto pt-28 px-4 pb-24 floating-panel">
          <Box className="max-w-[1140px] mx-auto grid gap-6">
            {uiStore.mode === "community" && <CommunityFeed />}
            {uiStore.mode === "deal" && <DealList />}
          </Box>
        </Box>
      )}

      {/* 
         MANAGEMENT: Optional Bottom Drawer for Table (Admin/Expert view)
      */}
      <Box className="absolute left-6 bottom-8 z-30 pointer-events-none">
        <Box className="floating-panel pointer-events-auto">
          <Button 
            variant="contained" 
            className="bg-slate-900/80 backdrop-blur-xl text-white px-4 h-10 rounded-full shadow-2xl border border-white/10 hover:bg-slate-800 transition-all flex items-center gap-2 group"
            onClick={() => {/* Toggle Table Drawer */}}
          >
            <Box className="text-xs group-hover:rotate-12 transition-transform">📋</Box>
            <Typography className="text-[0.75rem] font-bold">식당 목록</Typography>
          </Button>
        </Box>
      </Box>

      {/* Global Overlays */}
      <SubmitModal />
      <Toast />

      <style jsx global>{`
        /* Overriding some AG-Grid styles locally if needed */
        .ag-theme-quartz-light {
          --ag-background-color: transparent !important;
          --ag-header-background-color: rgba(248, 250, 252, 0.5) !important;
        }
      `}</style>
    </AppShell>
  );
});

export default Home;
