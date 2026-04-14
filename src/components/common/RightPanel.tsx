import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { mapStore, Spot } from '@/store/mapStore';

const RightPanel = observer(() => {
  return (
    <Box className="fixed top-[140px] right-2.5 w-[min(228px,calc(100vw-20px))] sm:top-[124px] sm:right-4 sm:w-[264px] z-50 flex flex-col gap-2 sm:gap-3 pointer-events-none">
      <Box className="glass-card overflow-hidden pointer-events-auto shadow-2xl">
        <Box className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between border-b border-border/60">
          <Box className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.5px] text-text uppercase flex items-center gap-1.5 sm:gap-2">
            <Box className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            최근 등록 스팟
          </Box>
          <Typography component="span" className="text-[10px] sm:text-[11px] font-bold text-text3 cursor-pointer hover:text-accent transition-colors shrink-0">
            전체보기 →
          </Typography>
        </Box>
        
        <Box className="max-h-[256px] sm:max-h-[360px] overflow-y-auto custom-scrollbar">
          {mapStore.filteredSpots.map((spot: Spot) => (
            <Box 
              key={spot.id}
              onClick={() => {
                mapStore.setCenter(spot.lat, spot.lng);
                mapStore.setSelectedSpot(spot);
              }}
              className="p-2.5 sm:p-3.5 flex gap-2.5 sm:gap-3 items-center border-b border-border/40 cursor-pointer hover:bg-white/5 transition-all group last:border-b-0"
            >
              {/* Thumbnail Container */}
              <Box className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-surface2 border border-border/80 flex items-center justify-center text-[18px] sm:text-[20px] group-hover:scale-105 transition-transform">
                {spot.emoji}
              </Box>

              {/* Info Container */}
              <Box className="flex-1 min-w-0">
                <Typography className="text-[12px] sm:text-[13px] font-bold text-text mb-0.5 truncate group-hover:text-accent transition-colors">
                  {spot.name}
                </Typography>
                <Box className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
                    <Box className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 border uppercase tracking-wider ${
                        spot.category === '카페' 
                        ? 'bg-accent2/10 text-accent2 border-accent2/20' 
                        : spot.category === '분식' 
                          ? 'bg-warn/10 text-warn border-warn/20'
                          : 'bg-accent/10 text-accent border-accent/20'
                    }`}>
                        {spot.category}
                    </Box>
                    <Typography className="text-[10px] sm:text-[11px] text-text3 truncate font-medium">
                        {spot.address.split(' ').slice(0, 2).join(' ')}
                    </Typography>
                </Box>
              </Box>

              {/* Price Container */}
              <Typography className="text-[12px] sm:text-[13px] font-black text-warn shrink-0 tracking-tight">
                {spot.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Ad Banner */}
      <Box className="hidden sm:block glass-card p-3.5 text-center cursor-pointer border-border hover:border-accent3 transition-colors pointer-events-auto">
        <Typography className="text-[9px] text-text3 uppercase tracking-[1px] mb-1">AD</Typography>
        <Typography className="text-[12px] text-text2 font-medium">
          📦 이 자리는 광고 영역입니다<br />
          <span className="text-[11px] text-text3">문의: admin@spotmap.kr</span>
        </Typography>
      </Box>
    </Box>
  );
});

export default RightPanel;
