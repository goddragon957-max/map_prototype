import React from "react";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Head from "next/head";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Ticker from "@/components/common/Ticker";
import Header from "@/components/layout/Header";
import BottomTab from "@/components/common/BottomTab";
import RightPanel from "@/components/common/RightPanel";
import InfoWindow from "@/features/restaurants/ui/InfoWindow";
import SpotGrid from "@/features/restaurants/ui/SpotGrid";
import RestaurantRanking from "@/features/restaurants/ui/RestaurantRanking";
import CommunityFeed from "@/features/community/ui/CommunityFeed";
import SubmitModal from "@/features/restaurants/ui/SubmitModal";
import Toast from "@/components/common/Toast";
import { uiStore } from "@/store/uiStore";

// Dynamically import KakaoMapBackground to avoid SSR issues
const KakaoMapBackground = dynamic(
  () => import("@/features/restaurants/ui/KakaoMapBackground"),
  { ssr: false }
);

const Home = observer(() => {
  return (
    <Box className="relative w-full h-screen overflow-hidden bg-bg text-text selection:bg-accent selection:text-[#0d0f14]">
      <Head>
        <title>스팟맵 — 내 주변 숨은 명소</title>
      </Head>

      {/* ── LAYOUT OVERLAYS ── */}
      <Ticker />
      <Header />
      
      {/* ── MAIN CONTENT AREA ── */}
      <Box className="relative w-full h-full pt-[94px] pb-[50px]">
        {/* Layer 0: The Map */}
        <KakaoMapBackground />

        {/* Layer 1: Floating Panels (UI) */}
        {uiStore.mode === "map" && (
          <>
            <RightPanel />
            <InfoWindow />
          </>
        )}

        {/* Layer 2: List/Ranking/Community Views (Refined) */}
        {uiStore.mode !== "map" && (
          <Box className="absolute inset-0 z-40 bg-bg overflow-y-auto p-4 animate-fadeIn">
            <Box className="max-w-[1140px] mx-auto py-8">
              <Box className="mb-10 px-1">
                <Typography className="text-[28px] font-extrabold text-text mb-2 tracking-tight uppercase">
                  {uiStore.mode === 'community' ? '💬 커뮤니티' : 
                   uiStore.mode === 'rank' ? '🏆 실시간 랭킹' : '☰ 전체 목록'}
                </Typography>
                <Typography className="text-[14px] text-text3 font-medium">
                    {uiStore.mode === 'community' ? '이웃들과 가성비 명소 정보를 실시간으로 공유해 보세요.' : 
                     uiStore.mode === 'rank' ? '이번 주 유저들에게 가장 사랑받은 가성비 스팟입니다.' : 
                     '내 주변 모든 가성비 스팟을 한눈에 확인하세요.'}
                </Typography>
              </Box>
              
              <Box className="pb-12">
                {uiStore.mode === 'list' && <SpotGrid />}
                {uiStore.mode === 'rank' && <RestaurantRanking />}
                {uiStore.mode === 'community' && <CommunityFeed />}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* ── GLOBAL NAVIGATION ── */}
      <BottomTab />

      {/* ── OVERLAYS/MODALS ── */}
      <SubmitModal />
      <Toast />

      {/* ── GLOBAL STYLE OVERRIDES ── */}
      <style jsx global>{`
        /* Next.js Pages Router specific body height fix */
        #__next {
          height: 100%;
        }
      `}</style>
    </Box>
  );
});

export default Home;
