import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";
import { uiStore } from "@/store/uiStore";

const RestaurantDetail = observer(() => {
  const r = restaurantStore.selectedRestaurant;

  if (!r) {
    return (
      <Box className="floating-panel glass-card h-full p-6 flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-xl border-white/50 rounded-[24px] shadow-xl">
        <Box className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-3xl opacity-50">
          📍
        </Box>
        <Typography variant="h3" className="text-lg font-bold text-slate-400">식당을 선택해 주세요</Typography>
        <Typography className="mt-2 text-slate-400 text-sm">마커나 검색을 통해 가성비<br /> 식당을 찾아보세요.</Typography>
      </Box>
    );
  }

  return (
    <Box className="floating-panel glass-card h-full p-5 flex flex-col gap-4 bg-white/78 backdrop-blur-xl border-white/60 rounded-[23px] shadow-2xl">
      {/* Header Info */}
      <Box>
        <Typography className="text-[0.65rem] font-extrabold text-slate-400 tracking-[0.1em] uppercase mb-1">
          {r.area} · {r.category}
        </Typography>
        <Typography variant="h2" className="text-[1.3rem] font-bold tracking-tight leading-tight">
          {r.name}
        </Typography>
        <Typography className="text-slate-500 text-sm mt-1.5 leading-relaxed">
          {r.summary}
        </Typography>
      </Box>

      {/* Ratings & Metadata */}
      <Box className="flex flex-wrap gap-2">
        <Box className="inline-flex items-center h-7 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100/50">
          ⭐ {r.rating}
        </Box>
        <Box className="inline-flex items-center h-7 px-3 rounded-full bg-slate-100 text-slate-500 text-[0.65rem] font-bold border border-white/50 shadow-sm">
          {r.update}
        </Box>
      </Box>

      {/* Price Label */}
      <Typography className="text-[1.8rem] font-black tracking-tight text-slate-900 leading-none">
        {r.priceLabel}
      </Typography>

      {/* Statistics Mini Grid */}
      <Box className="grid grid-cols-2 gap-2 mt-2">
        <Box className="p-3 rounded-2xl bg-white/50 border border-white/70 shadow-sm">
          <Typography className="text-lg font-bold">{r.reports}</Typography>
          <Typography className="text-[0.75rem] text-slate-400">누적 제보</Typography>
        </Box>
        <Box className="p-3 rounded-2xl bg-white/50 border border-white/70 shadow-sm">
          <Typography className="text-lg font-bold">{r.likes}</Typography>
          <Typography className="text-[0.75rem] text-slate-400">좋아요</Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100/50">
        <Button variant="contained" className="w-full bg-slate-800 text-white h-11 rounded-xl text-sm font-bold shadow-lg">
          🗺️ 경로 찾기
        </Button>
        <Button 
          variant="text" 
          className="ghost-button w-full h-11 rounded-xl text-sm font-bold bg-white/40"
          onClick={() => uiStore.setSubmitModalOpen(true)}
        >
          제보 정보 수정
        </Button>
      </Box>
    </Box>
  );
});

export default RestaurantDetail;
