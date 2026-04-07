import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { mapStore } from '@/store/mapStore';

const InfoWindow = observer(() => {
  const spot = mapStore.selectedSpot;

  if (!spot) return null;

  return (
    <Box className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[min(380px,calc(100vw-32px))] z-50 glass-card animate-slideUp overflow-hidden pointer-events-auto">
      <Button 
        onClick={() => mapStore.setSelectedSpot(null)}
        className="absolute top-2.5 right-2.5 w-7 h-7 min-w-0 p-0 rounded-full bg-black/40 text-white border-0 hover:bg-black/60 shadow-lg z-10"
      >
        ✕
      </Button>
      
      <Box className="w-full h-[140px] bg-linear-to-br from-surface2 to-bg flex items-center justify-center text-[48px] relative">
        <Box className="animate-bounce">
          {spot.emoji}
        </Box>
        <Box className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-accent text-bg text-[11px] font-bold">
          {spot.category}
        </Box>
      </Box>

      <Box className="p-4">
        <Typography className="text-[17px] font-extrabold text-text mb-1">
          {spot.name}
        </Typography>
        <Typography className="text-[12px] text-text2 flex items-center gap-1 mb-2.5">
          📍 {spot.address}
        </Typography>

        <Box className="flex gap-4 mb-3">
          <Box className="flex flex-col">
            <Typography className="text-[16px] font-extrabold text-accent">{spot.price}</Typography>
            <Typography className="text-[10px] text-text3">최저가</Typography>
          </Box>
          <Box className="flex flex-col">
            <Typography className="text-[16px] font-extrabold text-accent">{spot.rating}⭐</Typography>
            <Typography className="text-[10px] text-text3">평점</Typography>
          </Box>
          <Box className="flex flex-col">
            <Typography className="text-[16px] font-extrabold text-accent">{spot.reviews}</Typography>
            <Typography className="text-[10px] text-text3">리뷰</Typography>
          </Box>
        </Box>

        <Typography className="text-[12px] text-text2 leading-relaxed mb-3">
          {spot.description}
        </Typography>

        <Box className="flex gap-2">
          <Button className="flex-1 h-9 rounded-lg bg-accent text-bg text-[12px] font-bold">
            🗺 길찾기
          </Button>
          <Button variant="outlined" className="flex-1 h-9 rounded-lg border-border text-text2 text-[12px] font-bold hover:border-accent hover:text-accent">
            ☆ 저장
          </Button>
          <Button variant="outlined" className="flex-1 h-9 rounded-lg border-border text-text2 text-[12px] font-bold hover:border-accent hover:text-accent">
            ↗ 공유
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default InfoWindow;
