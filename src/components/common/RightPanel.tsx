import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { mapStore, Spot } from '@/store/mapStore';

const RightPanel = observer(() => {
  return (
    <Box className="fixed top-[110px] right-4 w-[270px] z-50 flex flex-col gap-2.5 pointer-events-none">
      <Box className="glass-card overflow-hidden pointer-events-auto">
        <Box className="px-3.5 py-3 flex items-center justify-between border-b border-border">
          <Box className="text-[12px] font-bold tracking-[0.5px] text-text2 uppercase flex items-center gap-1.5">
            <Box className="w-1.5 h-1.5 rounded-full bg-accent" />
            최근 등록 스팟
          </Box>
          <Typography component="span" className="text-[11px] text-text3 cursor-pointer hover:text-accent transition-colors">
            전체보기 →
          </Typography>
        </Box>
        
        <Box className="max-h-[400px] overflow-y-auto">
          {mapStore.spots.map((spot: Spot) => (
            <Box 
              key={spot.id}
              onClick={() => mapStore.setSelectedSpot(spot)}
              className="p-3.5 flex gap-2.5 items-center border-b border-border/50 cursor-pointer hover:bg-accent/5 transition-colors last:border-b-0"
            >
              <Box className="w-11 h-11 shrink-0 rounded-lg bg-surface2 border border-border flex items-center justify-center text-[20px]">
                {spot.emoji}
              </Box>
              <Box className="flex-1 min-w-0">
                <Typography className="text-[13px] font-semibold text-text mb-0.5 truncate">
                  {spot.name}
                </Typography>
                <Box className="flex items-center gap-1.5">
                    <Box className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        spot.category === '카페' ? 'bg-accent2/10 text-accent2' : 'bg-accent/10 text-accent'
                    }`}>
                        {spot.category}
                    </Box>
                    <Typography className="text-[11px] text-text3 truncate">
                        {spot.address.split(' ').slice(0, 2).join(' ')}
                    </Typography>
                </Box>
              </Box>
              <Typography className="text-[12px] font-bold text-warn shrink-0">
                {spot.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Ad Banner */}
      <Box className="glass-card p-3.5 text-center cursor-pointer border-border hover:border-accent3 transition-colors pointer-events-auto">
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
