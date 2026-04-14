import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { mapStore } from "@/store/mapStore";

const KakaoMapBackground = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    } else {
      const timer = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            setIsLoaded(true);
          });
          clearInterval(timer);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

  const goMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapStore.setCenter(latitude, longitude);
      });
    }
  };

  if (!isLoaded) {
    return (
      <Box className="fixed inset-0 bg-[#0d0f14] flex items-center justify-center z-0">
        <Typography className="text-text2 animate-pulse">지도를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  return (
    <Box className="fixed inset-0 z-0 pointer-events-auto">
      {/* Map Overlay Styling (Radial Neon Glow) */}
      <Box 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(110,231,183,0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(56,189,248,0.04) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Top Fade Gradient */}
      <Box className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-bg/40 to-transparent z-40 pointer-events-none" />
      
      <Map
        center={mapStore.center}
        style={{ width: "100%", height: "100%" }}
        level={4}
        onCreate={setMap}
        onClick={() => mapStore.setSelectedSpot(null)}
      >
        {mapStore.filteredSpots.map((spot) => (
          <CustomOverlayMap 
            key={spot.id} 
            position={{ lat: spot.lat, lng: spot.lng }} 
            yAnchor={1.2}
          >
            <Box 
              onClick={() => mapStore.setSelectedSpot(spot)}
              className={`marker-bubble flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] text-[12px] font-bold whitespace-nowrap shadow-sm backdrop-blur-[10px] cursor-pointer transition-all relative transform hover:scale-110 active:scale-95 ${
                mapStore.selectedSpot?.id === spot.id ? "scale-108 ring-4 ring-accent/20 shadow-xl z-20" : "z-10"
              } ${
                spot.color === 'green' ? 'border-accent text-accent' :
                spot.color === 'blue' ? 'border-accent2 text-accent2' :
                spot.color === 'pink' ? 'border-accent3 text-accent3' :
                'border-warn text-warn'
              } bg-surface`}
            >
              <span className="text-[14px]">{spot.emoji}</span> {spot.price}
              <Box 
                className={`absolute bottom-[-6.5px] left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-inherit`}
                style={{ borderTopColor: 'inherit' }}
              />
            </Box>
          </CustomOverlayMap>
        ))}
      </Map>

      {/* Map Grid / Overlay Styling */}
      <Box className="absolute inset-0 pointer-events-none z-1 bg-linear-to-b from-bg/40 to-transparent h-40" />

      {/* Map Controls */}
      <Box className="fixed right-4 bottom-16 z-50 flex flex-col gap-1.5">
        <Button 
          onClick={() => map?.setLevel(map.getLevel() - 1)}
          aria-label="지도 확대"
          className="w-10 h-10 min-w-0 p-0 rounded-lg bg-surface border border-border text-text hover:border-accent hover:text-accent shadow-sm"
        >
          <Plus className="h-[18px] w-[18px]" />
        </Button>
        <Button 
          onClick={() => map?.setLevel(map.getLevel() + 1)}
          aria-label="지도 축소"
          className="w-10 h-10 min-w-0 p-0 rounded-lg bg-surface border border-border text-text hover:border-accent hover:text-accent shadow-sm"
        >
          <Minus className="h-[18px] w-[18px]" />
        </Button>
        <Button 
          onClick={goMyLocation}
          aria-label="내 위치로 이동"
          className="w-10 h-10 min-w-0 p-0 rounded-lg bg-surface border border-accent2 text-accent2 hover:bg-surface2 transition-all shadow-sm"
        >
          <LocateFixed className="h-[18px] w-[18px]" />
        </Button>
      </Box>

      <style jsx global>{`
        /* Minimal custom styles to bridge tailwind for pseudo-elements if needed */
        .marker-bubble::after {
          content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
          border: 5px solid transparent; border-top-color: inherit;
          border-bottom: none;
        }
      `}</style>
    </Box>
  );
});

export default KakaoMapBackground;
