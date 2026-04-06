import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Map, MapMarker, CustomOverlayMap, ZoomControl, MapTypeControl } from "react-kakao-maps-sdk";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import IconButton from "@mui/material/IconButton";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";
import { toastStore } from "@/store/toastStore";

const KakaoMapBackground = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const filtered = restaurantStore.filteredRestaurants;

  // Initialize map center (Seoul Hongdae area)
  const [center, setCenter] = useState({ lat: 37.558, lng: 126.925 });

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

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      toastStore.setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          toastStore.setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toastStore.setLoading(false);
          // Fallback or error message could go here
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
    }
  };

  if (!isLoaded) {
    return (
      <Box className="fixed inset-0 bg-slate-100 flex items-center justify-center z-0">
        <Typography color="textSecondary">지도를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  return (
    <Box className="fixed inset-0 z-0 pointer-events-auto">
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={4}
        onCreate={setMap}
        onCenterChanged={(map) => setCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        })}
        onClick={() => restaurantStore.setSelectedId(null)}
      >
        {/* Built-in Kakao Map Controls */}
        <ZoomControl position={"BOTTOMRIGHT"} />
        <MapTypeControl position={"TOPRIGHT"} />

        {/* Markers and Overlays */}
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

      {/* Floating My Location Button */}
      <Box className="fixed right-6 bottom-32 z-10">
        <IconButton 
          onClick={handleMyLocation}
          className="bg-white/80 backdrop-blur-md shadow-lg border border-white/50 hover:bg-white text-blue-600"
          size="large"
        >
          <GpsFixedIcon />
        </IconButton>
      </Box>
    </Box>
  );
});

export default KakaoMapBackground;
