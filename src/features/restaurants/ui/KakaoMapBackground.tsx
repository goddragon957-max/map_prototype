import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";

const KakaoMapBackground = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const filtered = restaurantStore.filteredRestaurants;

  // Initialize map center (Seoul Hongdae area)
  const defaultCenter = { lat: 37.558, lng: 126.925 };

  useEffect(() => {
    // Check if kakao map script is loaded
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
    } else {
      // Small delay to wait for script from _document.tsx
      const timer = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          setIsLoaded(true);
          clearInterval(timer);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

  if (!isLoaded) {
    return (
      <Box className="fixed inset-0 bg-slate-100 flex items-center justify-center z-0">
        <Typography color="textSecondary">지도를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  return (
    <Box className="fixed inset-0 z-0">
      <Map
        center={defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={4}
        onClick={() => restaurantStore.setSelectedId(null)}
      >
        {filtered.map((r) => (
          <React.Fragment key={r.id}>
            <MapMarker
              position={{ lat: r.lat, lng: r.lng }}
              onClick={() => restaurantStore.setSelectedId(r.id)}
              image={{
                src: r.id === restaurantStore.selectedId 
                  ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png" 
                  : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: { width: 24, height: 35 },
              }}
            />
            {/* Custom Overlay for restaurant name if needed */}
            {r.id === restaurantStore.selectedId && (
              <CustomOverlayMap position={{ lat: r.lat, lng: r.lng }} yAnchor={2.2}>
                <Box className="bg-white px-3 py-1.5 rounded-full shadow-lg border border-red-200">
                  <Typography weight="bold" className="text-sm text-red-600 whitespace-nowrap">
                    {r.name}
                  </Typography>
                </Box>
              </CustomOverlayMap>
            )}
          </React.Fragment>
        ))}
      </Map>
    </Box>
  );
});

export default KakaoMapBackground;
