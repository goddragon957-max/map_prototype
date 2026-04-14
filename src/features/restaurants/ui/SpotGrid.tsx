import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { mapStore } from "@/store/mapStore";

const SpotGrid = observer(() => {
  const rowData = mapStore.filteredSpots;

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between px-1">
        <Typography className="text-[18px] font-extrabold text-text tracking-tight uppercase">
          📍 전체 스팟 <span className="text-[13px] font-normal text-text3 ml-2 tracking-normal lowercase">총 {rowData.length}개</span>
        </Typography>
      </Box>

      {/* Card Grid */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {rowData.map((spot, index) => (
          <Box
            key={spot.id}
            onClick={() => {
              mapStore.setCenter(spot.lat, spot.lng);
              mapStore.setSelectedSpot(spot);
            }}
            className="group glass-card overflow-hidden cursor-pointer hover:border-accent transition-all animate-fadeIn"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Thumbnail Area */}
            <Box className="w-full h-32 bg-linear-to-br from-surface2 to-bg flex items-center justify-center text-[42px] relative group-hover:scale-105 transition-transform duration-300">
              <Box className="animate-pulse-slow">
                {spot.emoji}
              </Box>
              <Box className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-accent text-bg text-[10px] font-black uppercase tracking-wider">
                {spot.category}
              </Box>
            </Box>

            {/* Content Area */}
            <Box className="p-4 bg-surface/50">
              <Typography className="text-[15px] font-bold text-text mb-1 group-hover:text-accent transition-colors truncate">
                {spot.name}
              </Typography>
              <Typography className="text-[11px] text-text3 mb-3 truncate">
                📍 {spot.address}
              </Typography>

              <Box className="flex justify-between items-center">
                <Typography className="text-[14px] font-black text-warn">
                  {spot.price}
                </Typography>
                <Box className="flex items-center gap-2">
                  <Typography className="text-[11px] font-bold text-accent">
                    {spot.rating}⭐
                  </Typography>
                  <Typography className="text-[11px] text-text3">
                    리뷰 {spot.reviews}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
      `}</style>
    </Box>
  );
});

export default SpotGrid;
