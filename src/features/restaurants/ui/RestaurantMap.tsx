import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";
import RestaurantRanking from "./RestaurantRanking";

const RestaurantMap = observer(() => {
  const filtered = restaurantStore.filteredRestaurants;

  return (
    <Box className="relative min-h-[32rem] p-4 rounded-[28px] overflow-hidden bg-gradient-to-b from-[#f1f5fb] to-[#d2dff1] border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.74)]">
      {/* Grid line effect */}
      <Box className="absolute inset-0 pointer-events-none opacity-20" 
        style={{ backgroundImage: "linear-gradient(rgba(134, 156, 188, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(134, 156, 188, 0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} 
      />

      {/* Region names */}
      <Typography className="absolute left-[12%] top-[18%] font-bold text-slate-400 select-none">연남</Typography>
      <Typography className="absolute left-[22%] top-[54%] font-bold text-slate-400 select-none">합정</Typography>
      <Typography className="absolute left-[58%] top-[34%] font-bold text-slate-400 select-none">성수</Typography>
      <Typography className="absolute left-[72%] top-[68%] font-bold text-slate-400 select-none">잠실</Typography>

      {/* Markers */}
      {filtered.map((r) => (
        <Box
          key={r.id}
          className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all ${
            restaurantStore.selectedId === r.id ? "bg-red-600 ring-4 ring-red-100 scale-125" : "bg-[#1d3366] ring-[6px] ring-white/75"
          }`}
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
          onClick={() => restaurantStore.setSelectedId(r.id)}
        >
          {/* Stem effect */}
          <Box className="absolute left-1/2 top-full w-1 h-3.5 bg-gradient-to-b from-[#1d3366] to-transparent -translate-x-1/2 rounded-full" />
        </Box>
      ))}

      {/* Ranking Float */}
      <Box className="absolute right-4 top-4">
        <RestaurantRanking />
      </Box>
    </Box>
  );
});

export default RestaurantMap;
