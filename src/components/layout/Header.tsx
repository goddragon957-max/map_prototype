import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { uiStore } from "@/store/uiStore";

const Header = observer(() => {
  const chips = [
    { label: "음식점", active: true },
    { label: "카페", active: false },
    { label: "저가 메뉴", active: false },
    { label: "~7,000원", active: true },
    { label: "강남구", active: false },
    { label: "주차 가능", active: false },
    { label: "24시간", active: false },
  ];

  return (
    <Box className="fixed top-[34px] left-0 right-0 z-100 h-[60px] bg-bg/85 backdrop-blur-[20px] border-b border-border flex items-center px-4 gap-2.5">
      <Box className="w-1.5 h-1.5 rounded-full bg-accent mr-2.5 shrink-0" />
      <Box className="text-[20px] font-extrabold tracking-tight bg-linear-to-br from-accent to-accent2 bg-clip-text text-transparent whitespace-nowrap mr-1">
        스팟맵
      </Box>

      <Box className="flex gap-1.5 flex-1 overflow-x-auto scrollbar-none scroll-smooth h-full items-center">
        <Button 
          variant="outlined"
          className="h-8 px-3 rounded-full text-[12px] font-bold border-border bg-surface2 text-text whitespace-nowrap hover:border-accent2 hover:text-accent2 transition-all flex items-center gap-1.5"
        >
          ⚙ 필터링
        </Button>
        {chips.map((chip, idx) => (
          <Box
            key={idx}
            className={`h-8 px-3.5 rounded-full flex items-center gap-1.5 cursor-pointer whitespace-nowrap border transition-all text-[12px] font-bold ${
              chip.active 
                ? "bg-accent border-accent text-bg" 
                : "bg-surface border-border text-text2 hover:border-accent hover:text-accent"
            }`}
          >
            {chip.label} {chip.active && <span className="opacity-60 text-[10px]">✕</span>}
          </Box>
        ))}
      </Box>

      <Box className="flex items-center gap-2 shrink-0">
        <Button 
          variant="outlined" 
          className="w-9 h-9 min-w-0 p-0 rounded-lg border-border bg-surface text-text hover:border-accent2 hover:bg-surface2 transition-all"
        >
          🔍
        </Button>
        <Button 
          variant="outlined" 
          className="h-9 px-3.5 rounded-lg border-warn text-warn text-[12px] font-bold hover:bg-warn hover:text-bg transition-all flex items-center gap-1.5"
        >
          ☕ 커피 후원
        </Button>
        <Button 
          variant="contained" 
          className="h-9 px-3.5 rounded-lg bg-linear-to-br from-accent to-accent2 text-bg text-[12px] font-bold hover:opacity-85 transition-all"
          onClick={() => uiStore.setSubmitModalOpen(true)}
        >
          + 제보하기
        </Button>
      </Box>
    </Box>
  );
});

export default Header;
