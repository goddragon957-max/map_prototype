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
import { uiStore, ViewMode } from "@/store/uiStore";

// Dynamically import KakaoMapBackground to avoid SSR issues
const KakaoMapBackground = dynamic(
  () => import("@/features/restaurants/ui/KakaoMapBackground"),
  { ssr: false }
);

const Home = observer(() => {
  const modes: { label: string; value: ViewMode }[] = [
    { label: "지도", value: "map" },
    { label: "거지방", value: "community" },
    { label: "핫딜", value: "deal" },
  ];

  return (
    <AppShell>
      <Head>
        <title>한끼레이더 | 지도로 찾는 가성비 (Next.js)</title>
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
         LAYER 3: Bottom Floating Navigation 
      */}
      <Box className="fixed left-1/2 bottom-6 -translate-x-1/2 w-[min(26rem,calc(100vw-1.5rem))] flex items-center justify-between p-1.5 glass-card rounded-full bg-white/50 z-50 floating-panel shadow-2xl">
        {modes.map((m) => (
          <Button
            key={m.value}
            variant={uiStore.mode === m.value ? "contained" : "text"}
            onClick={() => uiStore.setMode(m.value)}
            className={`flex-1 min-h-[3rem] px-4 rounded-full font-bold transition-all ${
              uiStore.mode === m.value 
                ? "bg-slate-800 text-white shadow-lg" 
                : "text-slate-600"
            }`}
          >
            {m.label}
          </Button>
        ))}
      </Box>

      {/* 
         LAYER 4: Hidden/Collapsible Content (Table, Feed, Deals)
         These are activated via buttons or scroll.
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
      <Box className="absolute left-6 bottom-6 z-30 pointer-events-none">
        <Box className="floating-panel">
          <Button 
            variant="contained" 
            className="bg-slate-800/90 text-white px-5 h-12 rounded-2xl shadow-xl hover:bg-slate-900"
            onClick={() => {/* Toggle Table Drawer */}}
          >
            📋 식당 목록
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
