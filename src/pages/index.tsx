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

        {/* Layer 2: List/Ranking/Community Views (Proxied for now) */}
        {uiStore.mode !== "map" && (
          <Box className="absolute inset-0 z-40 bg-bg overflow-y-auto p-4 animate-fadeIn">
            <Box className="max-w-[1140px] mx-auto py-8">
              <Box className="mb-8">
                <Typography className="text-[24px] font-extrabold text-text mb-2">
                  {uiStore.mode === 'community' ? '💬 커뮤니티' : '🏆 실시간 랭킹'}
                </Typography>
                <Typography className="text-text3">
                    {uiStore.mode === 'community' ? '이웃들과 가성비 정보를 공유해 보세요.' : '이번 주 가장 핫한 가성비 스팟입니다.'}
                </Typography>
              </Box>
              
              {/* Dummy content for list view */}
              <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i} className="glass-card p-4 hover:border-accent transition-all cursor-pointer">
                    <Box className="w-full h-40 bg-surface2 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      {i % 2 === 0 ? '🍜' : '☕'}
                    </Box>
                    <Typography className="text-[16px] font-bold mb-1">가상의 스팟 #{i}</Typography>
                    <Typography className="text-[12px] text-text3 mb-3">서울시 마포구 어느 길가</Typography>
                    <Box className="flex justify-between items-center">
                        <Typography className="text-accent font-bold">5,000원</Typography>
                        <Box className="flex items-center gap-1.5 text-[11px] text-text3">
                            <span>⭐ 4.5</span>
                            <span>💬 12</span>
                        </Box>
                    </Box>
                  </Box>
                ))}
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
