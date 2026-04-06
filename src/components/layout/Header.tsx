import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { uiStore, ViewMode } from "@/store/uiStore";

const Header = observer(() => {
  return (
    <Box className="floating-panel glass-card rounded-[20px] grid grid-cols-1 md:grid-cols-[auto_auto] gap-3 items-center p-2.5 shadow-2xl backdrop-blur-xl border-white/50">
      <Box className="flex items-center gap-2.5">
        <Box className="brand-chip h-9 px-3.5 rounded-full bg-slate-800 text-white flex items-center justify-center font-extrabold text-[1.2rem] min-w-34 tracking-tighter">
          한끼레이더
        </Box>
        <Box className="hidden sm:block">
          <Typography className="text-[0.6rem] font-bold text-slate-400 tracking-[0.05em] uppercase leading-none mb-0.5">
            가성비 지도
          </Typography>
          <Typography variant="h3" className="text-xs md:text-[0.85rem] font-bold tracking-tight">
            현재 1,280여 곳
          </Typography>
        </Box>
      </Box>

      <Box className="flex items-center gap-1.5 ml-auto">
        <Button 
          variant="text" 
          className="ghost-button h-8 px-3 rounded-full hidden md:inline-flex text-[0.7rem] font-bold"
        >
          🔍 검색
        </Button>
        <Button 
          variant="contained" 
          className="bg-gradient-to-br from-[#1d3366] to-[#3553a6] shadow-lg h-8 px-4 rounded-full text-[0.7rem] font-bold"
          onClick={() => uiStore.setSubmitModalOpen(true)}
        >
          제보하기
        </Button>
      </Box>
    </Box>
  );
});

export default Header;
