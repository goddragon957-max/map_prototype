import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { uiStore, ViewMode } from "@/store/uiStore";

const Header = observer(() => {
  return (
    <Box className="floating-panel glass-card rounded-[24px] grid grid-cols-1 md:grid-cols-[1.3fr_auto] gap-4 items-center p-4 shadow-2xl backdrop-blur-xl border-white/50">
      <Box className="flex items-center gap-3">
        <Box className="brand-chip h-10 px-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-extrabold text-[1.4rem] min-w-[10rem] tracking-tighter">
          한끼레이더
        </Box>
        <Box className="hidden sm:block">
          <Typography className="text-[0.7rem] font-bold text-slate-400 tracking-[0.1em] uppercase mb-0.5">
            가성비 지도
          </Typography>
          <Typography variant="h3" className="text-sm md:text-[1rem] font-bold tracking-tight">
            현재 1,280여 곳 제보됨
          </Typography>
        </Box>
      </Box>

      <Box className="flex items-center gap-2">
        <Button 
          variant="text" 
          className="ghost-button h-10 px-4 rounded-full hidden md:inline-flex text-sm font-bold"
        >
          🔍 검색하기
        </Button>
        <Button 
          variant="contained" 
          className="bg-gradient-to-br from-[#1d3366] to-[#3553a6] shadow-lg h-10 px-5 rounded-full text-sm font-bold"
          onClick={() => uiStore.setSubmitModalOpen(true)}
        >
          제보하기
        </Button>
      </Box>
    </Box>
  );
});

export default Header;
