import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";

const RestaurantRanking = observer(() => {
  const top3 = [...restaurantStore.restaurants]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <Box className="floating-panel glass-card w-[min(12.5rem,calc(100vw-2rem))] p-2 rounded-[18px] bg-white/72 backdrop-blur-xl border-white/50 shadow-xl">
      <Typography className="text-[0.6rem] font-black text-slate-400 tracking-[0.08em] uppercase mb-1.5 px-1">
        실시간 인기 한끼
      </Typography>
      <Box className="grid gap-0.5">
        {top3.map((r, i) => (
          <Box
            key={r.id}
            className={`grid grid-cols-[auto_1fr_auto] gap-2 items-center p-1 rounded-xl cursor-pointer hover:bg-white/60 transition-colors ${
              r.id === restaurantStore.selectedId ? "bg-white/80" : ""
            }`}
            onClick={() => restaurantStore.setSelectedId(r.id)}
          >
            <Typography className={`text-[0.7rem] font-black ${i === 0 ? "text-orange-500" : "text-slate-400"}`}>
              {i + 1}
            </Typography>
            <Typography weight="semibold" className="text-[0.7rem] truncate text-slate-700">{r.name}</Typography>
            <Typography className="text-[0.6rem] text-blue-500 font-black">{r.likes}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default RestaurantRanking;
