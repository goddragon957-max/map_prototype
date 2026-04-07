import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { mapStore } from "@/store/mapStore";

const RestaurantRanking = observer(() => {
  // Use mapStore spots for ranking (sorted by rating/reviews as a proxy for popularity)
  const rankingSpots = [...mapStore.spots]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 10);

  const getRankBadgeClass = (index: number) => {
    if (index === 0) return "bg-warn/20 text-warn border-warn/30";
    if (index === 1) return "bg-slate-400/20 text-slate-400 border-slate-400/30";
    if (index === 2) return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    return "bg-surface2 text-text3 border-border";
  };

  const getRankLabel = (index: number) => {
    if (index < 3) return `TOP ${index + 1}`;
    return `#${index + 1}`;
  };

  return (
    <Box className="flex flex-col gap-3">
      {rankingSpots.map((spot, index) => (
        <Box
          key={spot.id}
          onClick={() => {
            mapStore.setCenter(spot.lat, spot.lng);
            mapStore.setSelectedSpot(spot);
          }}
          className="rank-item glass-card p-3.5 flex items-center gap-4 cursor-pointer hover:border-accent transition-all group animate-fadeIn"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Rank Number */}
          <Box className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[13px] border shrink-0 ${getRankBadgeClass(index)}`}>
            {index + 1}
          </Box>

          {/* Thumbnail */}
          <Box className="w-12 h-12 rounded-lg bg-surface2 flex items-center justify-center text-[24px] shrink-0 group-hover:scale-110 transition-transform">
            {spot.emoji}
          </Box>

          {/* Info */}
          <Box className="flex-1 min-w-0">
            <Typography className="text-[14px] font-bold text-text mb-0.5 truncate uppercase tracking-tight">
              {spot.name}
            </Typography>
            <Box className="flex items-center gap-2.5">
              <Typography className="text-[12px] text-text3 flex items-center gap-1">
                리뷰 {spot.reviews}개
              </Typography>
              <Typography className="text-[11px] font-bold text-accent">
                {spot.rating}⭐
              </Typography>
              <Typography className="text-[11px] font-bold text-warn">
                {spot.price}
              </Typography>
            </Box>
          </Box>

          {/* Badge */}
          <Box className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${getRankBadgeClass(index)}`}>
            {getRankLabel(index)}
          </Box>
        </Box>
      ))}
    </Box>
  );
});

export default RestaurantRanking;
